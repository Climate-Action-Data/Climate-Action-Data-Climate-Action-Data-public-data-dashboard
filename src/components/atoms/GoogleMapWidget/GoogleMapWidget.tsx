import { Text, Skeleton } from '@chakra-ui/react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { useEffect, useState } from 'react'
import { GoogleMap } from '../GoogleMap/GoogleMap'
import { useTranslation } from 'react-i18next'

const DEFAULT_MAP_LOCATION = { lat: 45.76342, lng: 4.834277 }
const DEFAULT_MAP_ZOOM_IN = 10
const DEFAULT_MAP_ZOOM = 1
export const geoDecode = (coordinates: ProjectCoordinates | string) => {
  return new Promise<google.maps.LatLngLiteral>((resolve, reject) => {
    if (`string` !== typeof coordinates) {
      resolve({ lat: coordinates.latitude, lng: coordinates.longitude })
    } else {
      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({ address: coordinates }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
          resolve({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() })
        } else {
          reject()
        }
      })
    }
  })
}

export const render = (status: Status, coordinates: google.maps.LatLngLiteral) => {
  if (status === Status.LOADING) {
    return <Skeleton borderTopLeftRadius="8px" borderTopRightRadius="8px" width="448px" height="448px" />
  } else {
    return <GoogleMap center={coordinates} zoom={coordinates !== DEFAULT_MAP_LOCATION ? DEFAULT_MAP_ZOOM_IN : DEFAULT_MAP_ZOOM} />
  }
}

interface GoogleMapWidgetProps {
  coordinates?: ProjectCoordinates | string
  onError?: (error: google.maps.LatLngLiteral) => void
}

export const GoogleMapWidget = (props: GoogleMapWidgetProps) => {
  const { coordinates, onError } = props
  const { t } = useTranslation(`projectDetails`)
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(DEFAULT_MAP_LOCATION)

  useEffect(() => {
    if (coordinates) {
      geoDecode(coordinates)
        .then((location) => {
          setMapCenter(location)
        })
        .catch(() => {
          setMapCenter(DEFAULT_MAP_LOCATION)
          onError ? onError(DEFAULT_MAP_LOCATION) : undefined
        })
    }
  }, [coordinates])

  if (!process?.env?.NEXT_PUBLIC_GOOGLE_MAP_API_KEY) {
    return <Text>{t(`noApiKey`)}</Text>
  }
  if (!coordinates) {
    return <Skeleton borderTopLeftRadius="8px" borderTopRightRadius="8px" width="448px" height="448px" />
  }
  return <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY} render={(status) => render(status, mapCenter)} />
}
