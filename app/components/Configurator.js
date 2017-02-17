import React, { PropTypes } from 'react';
import AppPropTypes from 'AppPropTypes';
import parseNumber from 'lib/parseNumber';

function Configurator({ uit, updateUIT }) {
  return (
    <div>
      <input
        type="number"
        value={uit}
        onChange={(event) => updateUIT(parseNumber(event.target.value))}
        placeholder="UIT"
      />
    </div>
  );
}

Configurator.propTypes = {
  uit: AppPropTypes.optionalNumber.isRequired,
  updateUIT: PropTypes.func.isRequired
};

export default Configurator;
