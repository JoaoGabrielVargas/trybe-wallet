import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, totalExpenses } = this.props;
    return (
      <header id="header-container">
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">
          {
            totalExpenses.toFixed(2)
          }
        </p>
        <p data-testid="header-currency-field"> BRL </p>
      </header>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    email: user.email,
    totalExpenses: state.wallet.totalExpenses,
  };
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
