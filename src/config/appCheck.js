import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { app } from './firebase';

export const initAppCheck = () => {
  if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_RECAPTCHA_SITE_KEY) {
    try {
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(process.env.REACT_APP_RECAPTCHA_SITE_KEY),
        isTokenAutoRefreshEnabled: true
      });
    } catch (error) {
      console.warn('App Check initialization failed:', error);
    }
  }
};