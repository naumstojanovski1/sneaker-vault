const rateLimitStore = new Map();

const securityMiddleware = (handler, options = {}) => {
  const { rateLimit = { max: 10, window: 60000 } } = options;

  return async (event, context) => {
    const clientIP = event.headers['x-forwarded-for'] || 'unknown';
    const key = `${event.path}_${clientIP}`;
    
    if (!rateLimitStore.has(key)) rateLimitStore.set(key, []);
    
    const now = Date.now();
    const requests = rateLimitStore.get(key).filter(time => time > now - rateLimit.window);
    
    if (requests.length >= rateLimit.max) {
      return {
        statusCode: 429,
        body: JSON.stringify({ error: 'Rate limit exceeded' })
      };
    }
    
    requests.push(now);
    rateLimitStore.set(key, requests);

    const response = await handler(event, context);
    return {
      ...response,
      headers: {
        ...response.headers,
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      }
    };
  };
};

module.exports = { securityMiddleware };