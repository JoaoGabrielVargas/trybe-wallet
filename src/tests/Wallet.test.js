import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Testa a página de Wallet', () => {
  test('Verifica se o header é renderizado', () => {
    renderWithRouterAndRedux(<Wallet />);
    const header = screen.getByRole('banner', { name: '' });
    expect(header).toBeInTheDocument();
  });
  test('Verifica se o email é renderizado no header', () => {
    renderWithRouterAndRedux(<Wallet />);
    const email = screen.getByTestId('header-currency-field');
    expect(email).toBeInTheDocument();
  });
  test('Verifica se o valor total é renderizado no header', () => {
    renderWithRouterAndRedux(<Wallet />);
    const total = screen.getByTestId('total-field');
    expect(total).toBeInTheDocument();
    expect(total.innerHTML).toBe('0');
  });
  test('Verifica se o email é renderizado', () => {
    renderWithRouterAndRedux(<Wallet />);
    const headerEmail = screen.getByTestId('email-field');
    expect(headerEmail).toBeInTheDocument();
  });

  test('verifica os campos do wallet form', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputValue = screen.getByTestId('value-input');
    expect(inputValue).toBeInTheDocument();

    const description = screen.getByTestId('description-input');
    expect(description).toBeInTheDocument();

    const currencies = screen.getByTestId('currency-input');
    expect(currencies).toBeInTheDocument();

    const method = screen.getByTestId('method-input');
    expect(method).toBeInTheDocument();

    const tag = screen.getByTestId('tag-input');
    expect(tag).toBeInTheDocument();
  });

  test('verifica se é possível digitar nos campos do wallet form', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputValue = screen.getByTestId('value-input');
    expect(inputValue).toBeInTheDocument();
    userEvent.type(inputValue, '10');
    expect(inputValue).toHaveValue(10);

    const description = screen.getByTestId('description-input');
    userEvent.type(description, 'Dez dólares');
    expect(description).toHaveValue('Dez dólares');
  });
});
