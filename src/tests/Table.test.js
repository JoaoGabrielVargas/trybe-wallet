import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Table from '../components/Table';

describe('Testa o componente table', () => {
  test('Verifica se o componente Table é renderizado', () => {
    renderWithRouterAndRedux(<Table />);
    const tableTitle = screen.getByText('Table');
    expect(tableTitle).toBeInTheDocument();
  });
});
