import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi, actSaveExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    paymentMethod: '',
    tag: '',
    id: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  saveExpenses = async () => {
    const { dispatch, apiRes, totalExpenses } = this.props;
    const {
      value, description, currency, paymentMethod, tag, id } = this.state;
    const converted = Number(apiRes[currency].ask) * Number(value);
    const totalSum = totalExpenses + converted;
    dispatch(fetchApi());
    const expensesObj = {
      value,
      currency,
      method: paymentMethod,
      tag,
      description,
      id,
      exchangeRates: { ...apiRes },
    };
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));

    await dispatch(actSaveExpenses(expensesObj, totalSum));

    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;
    return (
      <div id="wallet-form">
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            data-testid="value-input"
            name="value"
            onChange={ this.handleChange }
            value={ value }
            id="value"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            name="description"
            onChange={ this.handleChange }
            value={ description }
            id="description"
          />
        </label>
        <label htmlFor="currency">
          Moedas:
          <select
            data-testid="currency-input"
            id="currency"
            name="currency"
            onChange={ this.handleChange }
          >
            {currencies.map((element, index) => (
              <option key={ index } value={ element }>
                {element}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de Pagamento:
          <select
            name="paymentMethod"
            data-testid="method-input"
            id="method-input"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro"> Dinheiro</option>
            <option value="Cartão de crédito"> Cartão de crédito</option>
            <option value="Cartão de débito"> Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select
            name="tag"
            data-testid="tag-input"
            id="tag-input"
            onChange={ this.handleChange }
          >
            <option value="Alimentação"> Alimentação</option>
            <option value="Lazer"> Lazer</option>
            <option value="Trabalho"> Trabalho</option>
            <option value="Transporte"> Transporte</option>
            <option value="Saúde"> Saúde</option>
          </select>
        </label>
        <button
          type="button"
          id="add-expenses"
          onClick={ this.saveExpenses }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { wallet } = state;
  return {
    currencies: wallet.currencies,
    expenses: wallet.expenses,
    apiRes: wallet.apiRes,
    totalExpenses: wallet.totalExpenses,
  };
}

WalletForm.propTypes = {
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
