module.exports = (token, methods) => {
  return {
    baseURL: 'https://api.ogamba.com/paint/private',
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': 'https://api.ogamba.com',
      'Access-Control-Allow-Methods': methods,
      Credentials: true
    }
  };
};
