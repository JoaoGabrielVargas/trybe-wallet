// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_API, SAVE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  apiRes: [],
  totalExpenses: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      currencies: action.payload,
      apiRes: action.apiRes,
    };
  case SAVE_EXPENSES:
    console.log(action);
    console.log(state);
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      totalExpenses: action.totalExpenses,
    };
  default:
    return state;
  }
}

export default wallet;
