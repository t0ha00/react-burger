export function request(url: string, options?: RequestInit): Promise<unknown> {
  return fetch(url, options).then(checkResponse);
}

function checkResponse(res: Response): Promise<unknown> {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}
