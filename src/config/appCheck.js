import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { app } from './firebase';

export const initAppCheck = () => {
  // Disable App Check for now since no reCAPTCHA key is set
  return null;
};