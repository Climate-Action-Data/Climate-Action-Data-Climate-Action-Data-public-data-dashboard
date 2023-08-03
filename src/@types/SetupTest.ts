process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY = `lqkwjelkqwjelkqwje`

/* eslint-disable @typescript-eslint/no-empty-function */
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    }
  }
