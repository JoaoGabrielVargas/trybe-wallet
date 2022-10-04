import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    console.log(this.props);
    const { expenses } = this.props;
    return (
      <div>
        Table
        <table>
          <tbody>
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
            {expenses.map((element, index) => (
              <tr key={ index }>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  const { wallet } = state;
  return {
    expenses: wallet.expenses,
  };
}

Table.propTypes = {
  expenses: PropTypes.array,
  map: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Table);
