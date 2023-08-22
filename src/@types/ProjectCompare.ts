export enum CompareDataType {
  TEXT = `TEXT`,
  TEXT_HIGHLIGHTED = `TEXT_HIGHLIGHTED`,
  NUMBER = `NUMBER`,
  URL = `url`,
}

export type ProjectCompareData = {
  header: string
  data: string[]
  type?: CompareDataType
}
