import validator from 'validator';

const rateLimitStore = new Map();

export const validateEmail = (email) => {
  return validator.isEmail(email) && email.length <= 254;
};

export const validateOrderData = (orderData) => {
  const errors = [];
  
  if (!orderData.customer?.email || !validateEmail(orderData.customer.email)) {
    errors.push('Valid email is required');
  }
  
  if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
    errors.push('Order must contain at least one item');
  }
  
  if (!orderData.total || !validator.isFloat(orderData.total.toString(), { min: 0.01 })) {
    errors.push('Valid total amount is required');
  }
  
  return { isValid: errors.length === 0, errors };
};

export const checkRateLimit = (key, maxRequests = 5, windowMs = 3600000) => {
  const now = Date.now();
  
  if (!rateLimitStore.has(key)) rateLimitStore.set(key, []);
  
  const requests = rateLimitStore.get(key).filter(time => time > now - windowMs);
  
  if (requests.length >= maxRequests) {
    return { allowed: false };
  }
  
  requests.push(now);
  rateLimitStore.set(key, requests);
  
  return { allowed: true };
};