import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <input
          type="number"
          data-testid="value-input"
          name="value"
          onChange={ this.handleChange }
          value={ value }
        />
        <input
          type="text"
          data-testid="description-input"
          name="description"
          onChange={ this.handleChange }
          value={ description }
        />
        <select data-testid="currency-input">
          {currencies.map((element, index) => (
            <option key={ index } value={ element }>
              {element}
            </option>
          ))}
        </select>
        <select data-testid="method-input">
          <option> Dinheiro</option>
          <option> Cartão de crédito</option>
          <option> Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option> Alimentação</option>
          <option> Lazer</option>
          <option> Trabalho</option>
          <option> Transporte</option>
          <option> Saúde</option>
        </select>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { wallet } = state;
  return {
    currencies: wallet.currencies,
  };
}

WalletForm.propTypes = {
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
