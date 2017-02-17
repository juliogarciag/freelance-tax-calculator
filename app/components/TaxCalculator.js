import React from 'react';
import IncomesEditorContainer from 'containers/IncomesEditorContainer';
import TaxResultsContainer from 'containers/TaxResultsContainer';
import ConfiguratorContainer from 'containers/ConfiguratorContainer';

export default function TaxCalculator() {
  return (
    <div>
      <ConfiguratorContainer />
      <IncomesEditorContainer />
      <TaxResultsContainer />
    </div>
  );
}
