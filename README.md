# How to Deploy

1. Ensure that you have the correct origin and heroku remotes. If not, add them:

  ```sh
  $ git remote add origin git@github.com:juliogarciag/freelance-tax-calculator.git
  $ git remote add heroku https://git.heroku.com/freelance-tax-calculator.git
  ```

2. Ensure that you have the `heroku` client (available [here](https://devcenter.heroku.com/articles/heroku-cli))) and you added the static buildpack. You can add it this way:

  ```sh
  $ heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static.git
  ```

3. Deploy!

  ```sh
  npm run deploy
  ```
