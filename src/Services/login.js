import { config } from '../env/env.tsx';
import httpEncap from './httpEncap';

const generatePhoneOtp = (data) => {
  return httpEncap.post(config?.baseUrl + 'v1/auth/generate/phone/otp', data);
};
const registerUser = (data) => {
  return httpEncap.post(config?.baseUrl + 'v1/users/phone/register', data);
};
const verifyPhoneNumber = (data) => {
  return httpEncap.post(config?.baseUrl + 'v1/auth/verify/phone/otp', data);
};

const googleLogin = (googleData) => {
  return httpEncap.post(config?.baseUrl + 'v1/auth/google/login', googleData);
};
export { generatePhoneOtp , registerUser,googleLogin, verifyPhoneNumber};