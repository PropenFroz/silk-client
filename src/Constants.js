const prod = {
  url: {
    API_BASE_URL: 'https://silk-purwa.up.railway.app',
  }
}

const dev = {
  url: {
    API_BASE_URL: 'https://silk-purwa.up.railway.app'
  }
}

export const config = process.env.NODE_ENV === 'production' ? dev : prod

  //production