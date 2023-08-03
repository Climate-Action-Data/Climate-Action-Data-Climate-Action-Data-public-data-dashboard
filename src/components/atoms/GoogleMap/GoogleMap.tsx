import { Box } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react'

interface GoogleMapProps {
  center: google.maps.LatLngLiteral
  zoom: number
}

export const GoogleMap = (props: GoogleMapProps) => {
  const { center, zoom } = props
  const ref = React.useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center,
        zoom,
      })

      const marker = new google.maps.Marker({
        position: center,
      })

      marker.setMap(map)
    }
  })

  return <Box borderTopLeftRadius="8px" borderTopRightRadius="8px" h="448px" w="448px" ref={ref} id="map" />
}
