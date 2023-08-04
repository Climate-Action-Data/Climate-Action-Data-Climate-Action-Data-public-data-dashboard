import { Text, Skeleton, Box, Flex } from '@chakra-ui/react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { useEffect, useState } from 'react'
import { GoogleMap } from '@/components/atoms/GoogleMap/GoogleMap'
import { useTranslation } from 'react-i18next'
import { ProjectCoordinates } from '@/@types/ProjectDetails'

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
    return <Skeleton borderTopLeftRadius="8px" borderTopRightRadius="8px" width={[`unset`, `448px`]} height="448px" />
  } else {
    return <GoogleMap center={coordinates} zoom={coordinates !== DEFAULT_MAP_LOCATION ? DEFAULT_MAP_ZOOM_IN : DEFAULT_MAP_ZOOM} />
  }
}

interface GoogleMapWidgetProps {
  coordinates?: ProjectCoordinates | string
  isLoading?: boolean
}

export const GoogleMapWidget = (props: GoogleMapWidgetProps) => {
  const { coordinates, isLoading } = props
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
        })
    }
  }, [coordinates])

  if (!process?.env?.NEXT_PUBLIC_GOOGLE_MAP_API_KEY) {
    return <Text>{t(`noApiKey`)}</Text>
  }
  if (isLoading) {
    return <Skeleton borderTopLeftRadius="8px" borderTopRightRadius="8px" width={[`unset`, `448px`]} height="448px" />
  }

  if (!coordinates) {
    return (
      <Box position="relative" w={[`unset`, `448px`]} h="448px" minW={[`unset`, `448px`]} minH="448px">
        <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY} render={(status) => render(status, mapCenter)} />
        <Flex padding="120px" alignItems="center" textAlign="center" backgroundColor="#dbdee0cc" position="absolute" top={0} left={0} w="100%" h="100%">
          <Text fontSize="lg" color="lightGray.700">
            {t(`noCoordinates`)}
          </Text>
        </Flex>
      </Box>
    )
  }
  return <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY} render={(status) => render(status, mapCenter)} />
}
