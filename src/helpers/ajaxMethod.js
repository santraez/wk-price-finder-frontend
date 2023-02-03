const { REACT_APP_API_KEY } = process.env;

const ajaxMethod = async (url, method, body = '', file = false) => {
  let loading = true;
  let typeMethod;
  if (method === 'GET' || method === 'DELETE') {
    typeMethod = {
      method: method,
      headers: { 'x-api-key': REACT_APP_API_KEY }
    };
  } else if (method === 'POST' || method === 'PUT') {
    if (file) {
      typeMethod = {
        method: method,
        body: body
      };
    } else {
      typeMethod = {
        method: method,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': REACT_APP_API_KEY
        }
      };
    };
  };
  const response = await fetch(url, typeMethod);
  const data = await response.json();
  loading = false;
  return { data, loading };
};

export default ajaxMethod;