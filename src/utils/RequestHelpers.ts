import { UnitStatus } from '@/@types/Unit'

export const defaultHeaders = {
  maxBodyLength: Infinity,
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
  },
}

export const defaultDomain = process.env.NEXT_PUBLIC_API_HOST ?? `http://localhost:3001`

export const generateUnitUrl = (status: string) => {
  if (status === UnitStatus.RETIRED) {
    return `/unit/retirement?id=`
  } else {
    return `/unit/issuance?id=`
  }
}
