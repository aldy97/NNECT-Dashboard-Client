import { OfferPorps } from "../components/Offers";

export const UPDATE_OFFERS = "update offers";

export interface UpdateOffers {
  type: typeof UPDATE_OFFERS;
  offers: OfferPorps[];
}

export type OfferAction = UpdateOffers;
