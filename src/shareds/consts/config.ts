export const API_BASE_URL = 'https://vino-dev-python.dev.media.cyrm.ru/api/v1';
export const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const { hostname } = window.location;
    if (hostname === 'cheers-stage.dev.media.cyrm.ru') {
      return 'https://vino-stage-python.dev.media.cyrm.ru/api/v1/';
    } if (hostname === 'cheers.su') {
      return 'https://vino-prod-python.dev.media.cyrm.ru/api/v1/';
    }
    return 'https://vino-dev-python.dev.media.cyrm.ru/api/v1/';
  }
  if (process.env.NODE_ENV === 'production') {
    return 'https://vino-prod-python.dev.media.cyrm.ru/api/v1/';
  } if (process.env.NODE_ENV === 'test') {
    return 'https://vino-stage-python.dev.media.cyrm.ru/api/v1/';
  }
  return 'https://vino-dev-python.dev.media.cyrm.ru/api/v1/';
};
