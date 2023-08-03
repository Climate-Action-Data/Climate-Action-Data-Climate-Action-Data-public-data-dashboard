import { act, render, waitFor } from '@testing-library/react'
import { GoogleMapWidget, geoDecode, render as RenderMap } from './GoogleMapWidget'
import { Status } from '@googlemaps/react-wrapper'

const DEFAULT_COORDINATES = { latitude: 45.76342, longitude: 4.834277 }
const DEFAULT_COORDINATES_LATLNG = { lat: 45.76342, lng: 4.834277 }
const DEFAULT_COUNTRY = `France`

it(`renders correctly with coordinates`, async () => {
  await act(async () => {
    const { container } = render(<GoogleMapWidget coordinates={DEFAULT_COORDINATES} />)
    await waitFor(() => {
      expect(container).toMatchSnapshot()
    })
  })
})

it(`renders correctly with city`, async () => {
  await act(async () => {
    const { container } = render(<GoogleMapWidget coordinates={DEFAULT_COUNTRY} />)
    await waitFor(() => {
      expect(container).toMatchSnapshot()
    })
  })
})

it(`renders correctly with undefined`, async () => {
  await act(async () => {
    const { container } = render(<GoogleMapWidget coordinates={undefined} />)
    await waitFor(() => {
      expect(container).toMatchSnapshot()
    })
  })
})

const mockLoc = jest.fn()

const mockGeocoder = jest.fn((request, callback) => {
  if (request?.address === DEFAULT_COUNTRY) {
    callback(
      [
        {
          geometry: {
            location: { lat: mockLoc, lng: mockLoc },
          },
        },
      ],
      `OK`,
    )
  } else {
    callback([], `ERROR`)
  }
})

const mockHandleError = jest.fn()
const mockHandleData = jest.fn()

const setupGoogleMock = () => {
  global.window.google = {
    maps: {
      Geocoder: jest.fn(() => ({
        geocode: mockGeocoder,
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

it(`renders correctly with undefined coord`, async () => {
  await act(async () => {
    setupGoogleMock()
    const { container } = render(<GoogleMapWidget coordinates={undefined} />)
    await waitFor(() => {
      expect(container).toMatchSnapshot()
    })
  })
})

it(`renders correctly with country coord`, async () => {
  await act(async () => {
    setupGoogleMock()
    const { container } = render(<GoogleMapWidget coordinates={DEFAULT_COUNTRY} />)
    await waitFor(() => {
      expect(container).toMatchSnapshot()
    })
  })
})

it(`renders correctly with bad coord`, async () => {
  await act(async () => {
    setupGoogleMock()
    geoDecode(``)
      .then((res) => mockHandleData(res))
      .catch((err) => mockHandleError(err))
    await waitFor(() => {
      expect(mockHandleError).toHaveBeenCalled()
    })
  })
})

it(`render renders correctly with good status`, async () => {
  const renderedComponent = RenderMap(Status.SUCCESS, DEFAULT_COORDINATES_LATLNG)
  expect(renderedComponent).toMatchSnapshot()
})

it(`render renders correctly with bad status`, async () => {
  const renderedComponent = RenderMap(Status.FAILURE, DEFAULT_COORDINATES_LATLNG)
  expect(renderedComponent).toMatchSnapshot()
})

it(`render renders correctly with loading status`, async () => {
  const renderedComponent = RenderMap(Status.LOADING, DEFAULT_COORDINATES_LATLNG)
  expect(renderedComponent).toMatchSnapshot()
})
