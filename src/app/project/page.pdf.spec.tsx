import axios from 'axios'
import { PROJECT_DETAIL_PDF } from '../../test/TestOvermindMockData'
import { generateProjectPDFDocument } from './page.pdf'
import * as pdfrenderer from '@react-pdf/renderer'

jest.mock(`axios`, () => ({
  get: jest.fn((url) => {
    return Promise.resolve({
      data: PROJECT_DETAIL_PDF,
    })
  }),
}))

jest.mock(`file-saver`, () => jest.fn())

jest.mock(`./page.pdf`, () => ({
  ...jest.requireActual(`./page.pdf`),
  projectDetailsPdf: jest.fn().mockReturnValue({}),
}))

jest.mock(`@react-pdf/renderer`, () => ({
  Font: { register: () => null },
  Document: () => <div>Document</div>,
  Image: () => <div>Image</div>,
  Page: () => <div>Page</div>,
  PDFViewer: jest.fn(() => null),
  StyleSheet: { create: () => jest.fn() },
  Text: () => <div>Text</div>,
  View: () => <div>View</div>,
  Link: () => <a>url</a>,
  pdf: jest.fn().mockImplementation(() => ({
    toBlob: () => jest.fn().mockResolvedValue({}),
  })),
}))

const pdfFnSpy = jest.spyOn(pdfrenderer, `pdf`)
const axiosGetSpy = jest.spyOn(axios, `get`)

describe(`generateProjectPDFDocument`, () => {
  const mockId = `testid`

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it(`creates pdf from project details`, async () => {
    await generateProjectPDFDocument({ projectDetails: PROJECT_DETAIL_PDF })
    expect(pdfFnSpy).toBeCalledTimes(1)
  })

  it(`creates pdf from project id`, async () => {
    await generateProjectPDFDocument({ id: mockId })
    expect(pdfFnSpy).toBeCalledTimes(1)
    expect(axiosGetSpy).toBeCalledTimes(1)
  })

  it(`returns without creating pdf when project id and details are empty`, async () => {
    await generateProjectPDFDocument({})
    expect(pdfFnSpy).toBeCalledTimes(0)
  })

  it(`returns without creating pdf when api response is empty`, async () => {
    axiosGetSpy.mockRejectedValueOnce({ data: {} })
    await generateProjectPDFDocument({ id: mockId })
    expect(pdfFnSpy).toBeCalledTimes(0)
  })
})
