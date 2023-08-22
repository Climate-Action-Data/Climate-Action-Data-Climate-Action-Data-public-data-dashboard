export enum CompareDataType {
  STRING = `string`,
  URL = `url`,
}

export type ProjectCompareData = {
  header: string
  data: string[]
  type?: CompareDataType
}
