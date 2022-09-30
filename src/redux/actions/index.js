// Coloque aqui suas actions
export const FORM_LOGIN = 'FORM_LOGIN';
export const REQUEST_API = 'REQUEST_API';

export const formLogin = (payload) => ({
  type: FORM_LOGIN,
  payload,
});

export const actGetApi = (payload) => ({ type: REQUEST_API, payload });

export const fetchCurrenciesApi = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  delete json.USDT;
  const currencies = Object.entries(json).map((e) => e[0]);
  return currencies;
};

export function fetchApi() {
  return async (dispatch) => {
    const result = await (fetchCurrenciesApi());
    dispatch(actGetApi(result));
  };
}
