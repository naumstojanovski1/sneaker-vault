# SNEAKR - Premium Sneakers & Streetwear

E-commerce platform for premium sneakers and streetwear.

## Features

- Smart Collections (Men/Women categories)
- Brand Management
- Advanced Filters
- Product Management with CSV import
- Order Management
- SEO Optimized

## Setup

```bash
npm install
npm start
```

## Environment Variables

Create `.env.local`:
```
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project
REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_RECAPTCHA_SITE_KEY=your_recaptcha_key
```

## Security

- Firestore security rules with admin checks
- Input validation and rate limiting
- HTTPS enforcement
- Content Security Policy
- Firebase App Check integration

## Deployment

1. Deploy Firestore rules: `firebase deploy --only firestore:rules`
2. Set environment variables in hosting platform
3. Update admin email in `firestore.rules`
4. Enable Firebase App Check with reCAPTCHA v3

## Admin Panel

Access at `/admin` - manage products, orders, and brands.