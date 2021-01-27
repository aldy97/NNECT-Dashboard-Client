import { UPDATE_OFFERS, OfferAction } from "../actions/offerAction";
import { OfferPorps } from "../components/Offers";

export interface OfferReducerProps {
  offers: OfferPorps[];
}

const initialState: OfferReducerProps = {
  offers: [],
};

export const OfferReducer = (state: OfferReducerProps = initialState, action: OfferAction) => {
  switch (action.type) {
    case UPDATE_OFFERS: {
      return { offers: action.offers };
    }
    default:
      return state;
  }
};
