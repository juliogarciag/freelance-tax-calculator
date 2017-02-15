/* global require, process, __dirname */
/* eslint-disable no-use-before-define, no-console */
const path = require('path');
const shell = require('shelljs');
const packageJSON = require('../package.json');
const replace = require('replace');
const colors = require('colors/safe');

const INCREMENT_TYPE = process.argv[2] || 'patch';
const CURRENT_VERSION = packageJSON.version;
const NEW_VERSION = incrementVersion(CURRENT_VERSION, INCREMENT_TYPE);
const HEROKU_BUILDPACK_URL = 'https://github.com/heroku/heroku-buildpack-static.git';

let CURRENT_STEP = 0;

// =============================
// Checks
// =============================

logCheck('Heroku Client');
if (!shell.which('heroku')) {
  throwError(`
    You need to install the heroku client: https://devcenter.heroku.com/articles/heroku-cli
  `);
}

logCheck('Git Remotes');
const remotes = shell.exec('git remote').split('\n');
if (!remotes.includes('heroku') || !remotes.includes('origin')) {
  throwError('You need to have both origin and heroku remotes');
}

logCheck('Heroku Static Buildpack');
const addedBuildpack = command('heroku buildpacks').toString().includes(HEROKU_BUILDPACK_URL);
if (!addedBuildpack) {
  throwError(`
    You need to add ${HEROKU_BUILDPACK_URL} to your buildpacks:

      heroku buildpacks:set ${HEROKU_BUILDPACK_URL}
  `);
}

// =============================
// Steps
// =============================

logStep('Building bundle');
command('npm run build');

logStep('Updating package.json');
replace({
  regex: `"version": "${CURRENT_VERSION}"`,
  replacement: `"version": "${NEW_VERSION}"`,
  paths: [path.resolve(__dirname, '../package.json')]
});

logStep(`Commit and Tag version ${NEW_VERSION}`);
shell.exec('git add -A');
shell.exec(`git commit -m "deploy: version ${NEW_VERSION}"`);
shell.exec(`git tag v${NEW_VERSION}`);
shell.exec('git push origin --tags');

logStep('Pushing to origin');
shell.exec('git push origin master:master');

logStep('Pushing to heroku');
shell.exec('git push -f heroku master:master');

// =============================
// Private Functions
// =============================

function incrementVersion(version, incrementType) {
  let [major, minor, patch] = version.split('.');
  switch (incrementType) {
    case 'major':
      major = parseInt(major, 10) + 1;
      break;
    case 'minor':
      minor = parseInt(minor, 10) + 1;
      break;
    case 'patch':
      patch = parseInt(patch, 10) + 1;
      break;
    default:
      throwError(`increment should be major, minor or patch, not ${incrementType}`);
  }
  return [major, minor, patch].join('.');
}

function command(commandString) {
  return shell.exec(commandString).stdout;
}

function logCheck(text) {
  const preCheckingText = colors.cyan('[CHECKING]');
  console.log(`${preCheckingText} ${text}...`);
}

function logStep(text) {
  CURRENT_STEP += 1;
  const preStepText = colors.green(`[STEP ${CURRENT_STEP}]`);
  console.log(`\n${preStepText} ${text}...\n`);
}

function throwError(message) {
  throw new Error(colors.red(message.trim()));
}

/* eslint-enable no-use-before-define, no-console */
