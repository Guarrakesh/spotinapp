export const USE_COUPON = "USE_COUPON";
export const SET_COUPON = "SET_COUPON";
export const SET_SPOTCOINS = "SET_SPOTCOINS";

export const useCoupon = (code) => ({
  type: USE_COUPON,
  payload: {
    data: {
      code
    }
  }
});

export const setCoupon = (code) => ({
  type: SET_COUPON,
  payload: { data: { code }}
});

export const setSpotCoins = (value) => ({
  type: SET_SPOTCOINS,
  payload: { data: { value }}
});