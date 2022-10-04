import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Table from '../components/Table';
import Wallet from '../pages/Wallet';

describe('Testa o componente table', () => {
  test('Verifica se o componente Table é renderizado', () => {
    renderWithRouterAndRedux(<Table />);
    const tableTitle = screen.getByText('Table');
    expect(tableTitle).toBeInTheDocument();
  });

  test('Verifica se é possível adicionar despesa', () => {
    const { mockStore } = renderWithRouterAndRedux(<Wallet />, ['/carteira']);

    const input = screen.getByTestId('value-input');
    userEvent.type(input, '1');
    const description = screen.getByTestId('description-input');
    userEvent.type(description, 'Um dólar');
    const tag = screen.getByTestId('tag-input');
    userEvent.selectOptions(tag, 'Lazer');
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(mockStore.getState().wallet.expenses[0].value).toBe('1');
    expect(mockStore.getState().wallet.expenses[0].tag).toBe('Lazer');
    expect(mockStore.getState().wallet.expenses[0].description).toBe('Um dólar');
  });
});
