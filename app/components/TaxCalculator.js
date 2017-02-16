import React from 'react';
import IncomesEditorContainer from 'containers/IncomesEditorContainer';
import TaxResultsContainer from 'containers/TaxResultsContainer';

export default function TaxCalculator() {
  return (
    <div>
      <IncomesEditorContainer />
      <TaxResultsContainer />
    </div>
  );
}
