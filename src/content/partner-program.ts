import { claims } from "./claims";
const split = claims.find(c => c.id === "partner-split")!;
const estimate = claims.find(c => c.id === "partner-estimator")!;
/** Numeric inputs are kept with the claim register, not inferred from merchant fees. */
export const partnerProgram = {
  salesRepPercent: split.values!.salesRepPercent,
  referralPercent: split.values!.referralPercent,
  defaultMarginPercent: estimate.values!.defaultMarginPercent,
  defaultAttritionPercent: estimate.values!.defaultAttritionPercent,
  defaultVolume: estimate.values!.defaultVolume,
};
