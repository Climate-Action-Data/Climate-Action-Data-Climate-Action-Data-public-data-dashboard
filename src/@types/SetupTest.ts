process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY = `f7f87ee8-16d4-4e99-8aaa-11e36c7edd83`

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
