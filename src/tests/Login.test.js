import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';

const password = 'password-input';

describe('Testa a página de Login', () => {
  test('Verifica se o input de email está visível', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
  });

  test('Verifica se o input de senha está visível', () => {
    renderWithRouterAndRedux(<Login />);
    const passwordInput = screen.getByTestId(password);
    expect(passwordInput).toBeInTheDocument();
  });

  test('Verifica se o botão de entrar está visível', () => {
    renderWithRouterAndRedux(<Login />);
    const button = screen.getByText(/Entrar/i);
    expect(button).toBeInTheDocument();
  });

  test('Verifica se é possível digitar no campo de email', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByTestId(password);
    expect(emailInput).toBeInTheDocument();
    userEvent.type(emailInput, 'tryber@gmail.com');
    expect(emailInput).toHaveValue('tryber@gmail.com');
  });

  test('Verifica a rota para /carteira', () => {
    renderWithRouterAndRedux(<Wallet />, ['/carteira']);
    const headerTotal = screen.getByTestId('total-field');
    expect(headerTotal).toBeInTheDocument();
  });
});

test('Verifica se o botão de entrar está desabilitado', () => {
  renderWithRouterAndRedux(<Login />);
  const button = screen.getByText(/Entrar/i);
  expect(button).toHaveProperty('disabled', true);
});

test('Verifica se o botão de entrar habilita ao digitar', () => {
  renderWithRouterAndRedux(<Login />);
  const button = screen.getByText(/Entrar/i);
  expect(button).toHaveProperty('disabled', true);
  const emailInput = screen.getByTestId('email-input');
  expect(emailInput).toBeInTheDocument();
  userEvent.type(emailInput, 'trybe@gmail.com');
  const passwordInput = screen.getByTestId(password);
  expect(passwordInput).toBeInTheDocument();
  userEvent.type(passwordInput, '123456');
});
