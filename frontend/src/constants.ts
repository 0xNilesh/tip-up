// export const API_URL:string =  'https://tipper-386g.onrender.com/wallet';
export const API_URL: string = 'http://localhost:3000/wallet'
// export const API_URL: string = 'https://b700-124-122-192-206.ngrok-free.app/wallet';

export const NATIVE_TOKEN_ADDRESS: string =
  '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

/**
 * 1) No Preference -> Every chain
 * 2) Preference ->
 *      1. same chain ->
 *          a. cow supported ->
 *              i. token path available -> use cow
 *              ii. token path not available -> directly transfer token
 *          b. cow not supported -> directly transfer token
 *      2. different chain ->
 *          a. 1inch not supported on source/destination -> directly transfer token
 *          b. 1inch supported ->
 *              i. token path available -> use 1inch
 *              ii. token path not available -> directly transfer token
 */
