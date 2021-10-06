import './MapDisplay.css'

import React, {
  useState,
  useRef,
  useCallBack,
  useEffect,
  useContext,
} from 'react'
import {
  GoogleMap,
  useLoadScript,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronRightIcon,
} from '@heroicons/react/outline'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'
import axios from 'axios'

import { formatRelative } from 'date-fns'
import '@reach/combobox/styles.css'

import mapStyles from './mapStyles'
import SidebarVoting from './SidebarVoting'
import { DataContext } from '../context/DataProvider'

const libraries = ['places']

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
}

const center = {
  lat: 52.530008,
  lng: 13.404954,
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomcontrol: true,
}

const MapDisplay = ({
  coOrdinates,
  marker,
  votingHandler,
  saved,
  setSaved,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDZm5P_EhxPjg23_BRvxQl6sVUXrW1zSOY',
    libraries,
  })
  const [allMarkers, setAllMarkers] = useState([])
  const [loading, setLoading] = useState(true)
  const [markers, setMarkers] = useState([])
  const [selected, setSelected] = useState(null)
  const [clicked, setclicked] = useState(false)

  const { data } = useContext(DataContext)

  useEffect(() => {
    axios
      .get('/api/marks/')
      .then((res) => {
        setAllMarkers(res.data)
        setLoading(false)
        setSaved(false)
      })
      .catch((e) => console.log(e))
  }, [saved])

  const selectedClicked = () => {
    votingHandler(selected)
  }

  const onMapClick = React.useCallback((e) => {
    setclicked(true)
    coOrdinates({ lat: e.latLng.lat(), lng: e.latLng.lng() })
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ])
  }, [])
  const mapRef = React.useRef()
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map
  }, [])

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(16)
  }, [])

  //Up-Vote-Down-Vote
  const [upVote, setUpVote] = useState(0)
  const [downVote, setDownVote] = useState(0)

  if (loadError) return 'Error loading maps'
  if (!isLoaded) return 'Loading Maps'

  // const address= https://maps.googleapis.com/maps/api/geocode/json?latlng=44.4647452,7.3553838&key=YOUR_API_KEY
  return (
    <div>
      {/* <h1 className=" text-red-400 md:text-5xl font-sans md:font-bold">Safer Trails</h1>  */}
      <img
        className=" hidden md:flex md:absolute md:top-1 md:left-1 md:z-10 md:w-80 md:p-5 "
        src="/safeTrailsLogo.svg"
        alt="logo"
      />

      <Locate panTo={panTo} />
      <Search panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {Object.keys(marker).length !== 0 && (
          <div className="bg-red-800 bg-opacity-30 w-50 h-50 rounded-full">
            <Marker
              position={{ lat: marker.lat, lng: marker.lng }}
              text={marker.title}
              icon={{
                url: '/biking.png',
                scaledSize: new window.google.maps.Size(50, 50),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(30, 30),
              }}
            />
          </div>
        )}

        {allMarkers.length > 0 &&
          allMarkers.map((marker) => (
            <Marker
              key={marker.title + marker.date}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: '/Clipboard.png',
                scaledSize: new window.google.maps.Size(20, 20),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(10, 10),
              }}
              onClick={() => {
                setSelected(marker)
              }}
            />
          ))}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null)
            }}
          >
            <div
              className="flex flex-col cursor-pointer group w-40"
              onClick={selectedClicked}
            >
              <div className="h-20">
                <h2 className=" text-xl font-semibold mb-1 ">
                  {selected.title}
                </h2>
                <p className="text-sm mb-2 truncate overflow-ellipsis overflow-hidden ">
                  {selected.description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex mr-2">
                  <div class="flex items-center text-red-500">
                    <ChevronUpIcon className="h-6 w-6" />
                    <p className="font-bold text-sm">
                      {selected.votesup.length}
                    </p>
                  </div>
                  <div class="flex items-center ml-2">
                    <ChevronDownIcon className="h-6 w-6" />
                    <p className="font-bold text-sm">
                      {selected.votesdown.length}
                    </p>
                  </div>
                </div>
                <div className="flex ">
                  <div class="flex items-center ml-4">
                    <ChevronRightIcon className="h-8 w-8 group-hover:text-green-600" />
                  </div>
                </div>
              </div>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  )
}

export default MapDisplay

const Locate = ({ panTo }) => {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          },
          () => null
        )
      }}
    >
      <div class="tooltip-wrap">
        <img src="/thumb-compass.png" alt="compass" />
        <div class="tooltip-content">
          <p className="font-mono text-2xl">My Location</p>
        </div>
      </div>
      {/* <img src="/thumb-compass.png" alt="compass" /> */}
    </button>
  )
}

const Search = ({ panTo }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 52.520008, lng: () => 13.404954 },
      radius: 100 * 1000,
    },
  })

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleSelect = async (address) => {
    setValue(address, false)
    clearSuggestions()

    try {
      const results = await getGeocode({ address })
      const { lat, lng } = await getLatLng(results[0])
      panTo({ lat, lng })
    } catch (error) {
      console.log('😱 Error: ', error)
    }
  }

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location ..."
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}
