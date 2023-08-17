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

it(`creates pdf`, async () => {
  await generateProjectPDFDocument({ projectDetails: PROJECT_DETAIL_PDF })
  expect(pdfFnSpy).toBeCalledTimes(1)
})
