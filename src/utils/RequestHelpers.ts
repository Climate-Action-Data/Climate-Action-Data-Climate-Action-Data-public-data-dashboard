export const defaultHeaders = {
  maxBodyLength: Infinity,
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
  },
}

export const defaultDomain = process.env.NEXT_PUBLIC_API_HOST ?? `http://localhost:3001`
