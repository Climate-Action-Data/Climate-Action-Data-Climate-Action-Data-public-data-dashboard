import { render } from '@testing-library/react'
import { GoogleMap } from './GoogleMap'

const DEFAULT_MAP_LOCATION = { lat: 45.76342, lng: 4.834277 }
const DEFAULT_MAP_ZOOM_IN = 10

const mockGeocoder = jest.fn((request, callback) => {
  callback([], `OK`)
})

const setupGoogleMock = () => {
  global.window.google = {
    maps: {
      Geocoder: jest.fn(() => ({
        geocode: mockGeocoder,
      })),
      Map: jest.fn(() => ({
        setCenter: jest.fn(),
        setZoom: jest.fn(),
      })),
      Marker: jest.fn(() => ({
        setMap: jest.fn(),
      })),
      GeocoderStatus: {
        ERROR: `ERROR`,
        INVALID_REQUEST: `INVALID_REQUEST`,
        OK: `OK`,
        OVER_QUERY_LIMIT: `OVER_QUERY_LIMIT`,
        REQUEST_DENIED: `REQUEST_DENIED`,
        UNKNOWN_ERROR: `UNKNOWN_ERROR`,
        ZERO_RESULTS: `ZERO_RESULTS`,
      },
    } as any,
  }
}

beforeAll(() => {
  setupGoogleMock()
})

it(`renders correctly`, () => {
  const { container } = render(<GoogleMap center={DEFAULT_MAP_LOCATION} zoom={DEFAULT_MAP_ZOOM_IN} />)
  expect(container).toMatchSnapshot()
})
