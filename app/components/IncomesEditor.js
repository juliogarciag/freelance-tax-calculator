import React from 'react';
import AppPropTypes from 'AppPropTypes';
import SingleIncomeEditorContainer from 'containers/SingleIncomeEditorContainer';

function IncomesEditor({ incomes }) {
  return (
    <div>
      <div>
        <input type="text" defaultValue="Nombre" disabled />
        <input type="text" defaultValue="Monto (USD)" disabled />
        <input type="text" defaultValue="Tasa de Cambio" disabled />
        <input type="text" defaultValue="Monto (PEN)" disabled />
      </div>
      {
        incomes.map((income) =>
          <SingleIncomeEditorContainer key={income.get('id')} income={income} />
        )
      }
    </div>
  );
}

IncomesEditor.propTypes = {
  incomes: AppPropTypes.listOfIncomes.isRequired
};

export default IncomesEditor;
