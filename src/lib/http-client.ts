export function getBaseURL() {
  const params = new URLSearchParams(window.location.search)

  return params.get('base-url') || ''
}

export function http(url: string | URL | Request, options?: RequestInit) {
  return fetch(`${getBaseURL()}${url}`, options)
}
