import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isBtnDisabled: true,
  };

  buttonEnabler = () => {
    const { email, password } = this.state;
    const regexToEmail = /\S+@\S+\.\S+/;
    const verifyEmail = regexToEmail.test(email);
    const maxPassword = 6;
    const verifyLenght = password.length >= maxPassword;
    const verifyAll = verifyEmail && verifyLenght;
    console.log(verifyAll);
    if (verifyAll) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, () => {
      this.buttonEnabler();
    });
  };

  login = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(formLogin(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isBtnDisabled } = this.state;
    return (
      <div>
        Login
        <input
          type="email"
          data-testid="email-input"
          name="email"
          onChange={ this.handleChange }
          value={ email }
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          onChange={ this.handleChange }
          value={ password }
        />
        <button
          type="button"
          onClick={ this.login }
          disabled={ isBtnDisabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
