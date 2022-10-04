// Coloque aqui suas actions
export const FORM_LOGIN = 'FORM_LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const formLogin = (payload) => ({
  type: FORM_LOGIN,
  payload,
});

export const actGetApi = (payload, apiRes, currencyNames) => (
  { type: REQUEST_API, payload, apiRes, currencyNames });
export const actSaveExpenses = (payload, totalExpenses) => (
  { type: SAVE_EXPENSES, payload, totalExpenses });

export const fetchCurrenciesApi = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  delete json.USDT;
  return json;
};

export const actDeleteExpense = (payload, newTotal) => (
  { type: DELETE_EXPENSE, payload, newTotal }
);

function fetchApi() {
  return async (dispatch) => {
    const result = await (fetchCurrenciesApi());
    const currencies = Object.entries(result).map((e) => e[1]);
    const currencyNames = Object.entries(result).map((e) => e[0]);
    dispatch(actGetApi(currencies, result, currencyNames));
  };
}

export { fetchApi };
