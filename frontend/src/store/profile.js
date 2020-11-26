import { fetch } from "./csrf";
import { apiKey } from "./apikey";

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

  const res = await fetch("/api/profile/search-stock", {
    method: "POST",
    body: JSON.stringify({stock}),
  })

  const { stockData } = res.data

  dispatch(currentStock(stockData));

  return {
    type: CURRENT_STOCK,
    payload: stockData,
  };
}


export const getStock = ({ symbol }) => async (dispatch) => {
  const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${apiKey}`);

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



