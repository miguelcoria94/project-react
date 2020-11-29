import { fetch } from "./csrf";

const apikey = `3X02Y44FZUJOPFF9`;

const LOOKUP_STOCK = "LOOKUP_STOCK"
const CURRENT_STOCK = "CURRENT_STOCK"

const lookupStock = (symbol) => {
  return {
    type: LOOKUP_STOCK,
    payload: symbol,
  };
};

const currentStock = (stock) => {
  return {
    type: CURRENT_STOCK,
    payload: stock,
  };
};

export const mainStock = ({ stock }) => async (dispatch) => {
  const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stock}&apikey=${apikey}`);

  dispatch(currentStock(response));

  return {
    type: CURRENT_STOCK,
    payload: response,
  };
}


export const getStock = ({ symbol }) => async (dispatch) => {
  const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${apikey}`);

  const { bestMatches } = response.data
  
  dispatch(lookupStock(bestMatches));
  return {
    type: LOOKUP_STOCK,
    payload: bestMatches,
  };
};

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case LOOKUP_STOCK:
      return { ...state, symbol: action.payload };
    case CURRENT_STOCK:
      return { ...state, stock: action.payload}
    default:
      return state;
  }
}

export default profileReducer;



