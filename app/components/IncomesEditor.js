import React from 'react';
import AppPropTypes from 'AppPropTypes';
import SingleIncomeEditorContainer from 'containers/SingleIncomeEditorContainer';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const SortableIncomeEditor = SortableElement(({ income, index }) =>
  <SingleIncomeEditorContainer income={income} index={index} />
);

const IncomesEditor = SortableContainer(({ incomes }) => (
  <div>
    <div>
      <input type="text" defaultValue="Nombre" disabled />
      <input type="text" defaultValue="Monto (USD)" disabled />
      <input type="text" defaultValue="Tasa de Cambio" disabled />
      <input type="text" defaultValue="Monto (PEN)" disabled />
    </div>
    {
      incomes.map((income, index) =>
        <SortableIncomeEditor key={income.get('id')} index={index} income={income} />
      )
    }
  </div>
));

IncomesEditor.propTypes = {
  incomes: AppPropTypes.listOfIncomes.isRequired
};

export default IncomesEditor;
