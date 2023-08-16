import { CSVExportTypes } from '@/@types/CSV'
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
    return `/issuance?id=`
  }
}

export const generateExportUrl = (exportType: CSVExportTypes) => {
  let url = ``
  switch (exportType) {
    case CSVExportTypes.PROJECT:
      url = `${defaultDomain}/v1/projects/export`
      break
    case CSVExportTypes.UNIT:
      url = `${defaultDomain}/v1/units/export`
      break
  }
  return url
}
