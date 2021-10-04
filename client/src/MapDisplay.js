import './MapDisplay.css'

import React, { useState } from 'react'
import {
  GoogleMap,
  useLoadScript,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'

import { formatRelative } from 'date-fns'
import mapStyles from './mapStyles'

const libraries = ['places']

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
}

const center = {
  lat: 52.520008,
  lng: 13.404954,
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomcontrol: true,
}

const MapDisplay = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDZm5P_EhxPjg23_BRvxQl6sVUXrW1zSOY',
    libraries,
  })

  const [markers, setMarkers] = useState([])
  const [selected, setSelected] = useState(null)

  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ])
  }, [])

  if (loadError) return 'Error loading maps'
  if (!isLoaded) return 'Loading Maps'

  console.log(markers)

  return (
    <div>
      <h1 className="uppercase">Safe Trails</h1>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onClick={onMapClick}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: '/biking.png',
              scaledSize: new window.google.maps.Size(50, 50),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(30, 30),
            }}
            onClick={() => {
              setSelected(marker)
            }}
          />
        ))}
      </GoogleMap>
    </div>
  )
}

export default MapDisplay
