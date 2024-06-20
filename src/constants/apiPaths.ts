
const path = 'https://9x60z5i1uc.execute-api.eu-west-1.amazonaws.com/prod' 
///const path = 'http://localhost:3000' 

const API_PATHS = {
  product: `${path}`,
  order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
  import: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
  bff: `${path}`,
  cart: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
};

export default API_PATHS;
