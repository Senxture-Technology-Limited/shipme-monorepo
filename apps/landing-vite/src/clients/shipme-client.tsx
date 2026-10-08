export const ShipmeClient = {
  get,
  post,
  put,
  delete: _delete,
};

function get(url: string) {
  const requestOptions = {
    method: 'GET',
  };
  return fetch(url, requestOptions).then((resp) => { return handleResponse(resp) }).catch(handleError);
}

async function post(url: string, body: unknown) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  return fetch(url, requestOptions).then((resp) => { return handleResponse(resp) }).catch(handleError);
}

function put(url: string, body: unknown) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  return fetch(url, requestOptions).then((resp) => { return handleResponse(resp) }).catch(handleError);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url: string) {
  const requestOptions = {
    method: 'DELETE',
  };
  return fetch(url, requestOptions).then((resp) => { return handleResponse(resp) }).catch(handleError);
}

// helper functions

function handleResponse(response: Response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if ([400].includes(response.status)) {
        console.error(data)
      } else {
        console.error(data)
      }

      return Promise.reject(response);
    }

    return data;
  });
}

function handleError(err: unknown) {
  console.log(err);
}
