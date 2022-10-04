import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actDeleteExpense } from '../redux/actions';

class Table extends Component {
  deleteItem = ({ target: { id } }) => {
    const { dispatch, expenses, totalExpenses } = this.props;
    const newExpenses = expenses.filter((element) => Number(element.id) !== Number(id));
    const findElement = expenses.find((element) => Number(element.id) === Number(id));
    const { ask } = findElement.exchangeRates[findElement.currency];
    const converted = ask * findElement.value;
    const newTotal = expenses.length === 1 ? 0 : totalExpenses - converted;
    dispatch(actDeleteExpense(newExpenses, newTotal));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        Table
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((element) => {
              const { id } = element;
              return (
                <tr key={ id }>
                  <td>
                    {element.description}
                  </td>
                  <td>
                    {element.tag}
                  </td>
                  <td>
                    {element.method}
                  </td>
                  <td>
                    {Number(element.value).toFixed(2)}
                  </td>
                  <td>
                    {element.exchangeRates[element.currency].name}
                  </td>
                  <td>
                    {Number(element.exchangeRates[element.currency].ask).toFixed(2)}
                  </td>
                  <td>
                    {
                      Number(
                        Number(element.exchangeRates[element.currency].ask)
                        * Number(element.value),
                      ).toFixed(2)
                    }
                  </td>
                  <td>
                    Real
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={ this.deleteItem }
                      id={ id }
                      data-testid="delete-btn"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { wallet } = state;
  return {
    expenses: wallet.expenses,
    totalExpenses: wallet.totalExpenses,
  };
}

Table.propTypes = {
  expenses: PropTypes.array,
  map: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Table);
