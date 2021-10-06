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
            <div>
              <h2 className=" text-xl font-semibold">{selected.title}</h2>
              {/* <p>Time: {formatRelative(selected.time, new Date())}</p> */}
              <div className="flex justify-center">
                <button
                  class="flex items-center px-2 py-2  transition ease-in duration-200 uppercase rounded hover:bg-gray-800 text-red-500 hover:text-white border-2 border-gray-4P00 focus:outline-none"
                  onClick={selectedClicked}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7l4-4m0 0l4 4m-4-4v18"
                    />
                  </svg>
                  {selected.votesup.length}
                </button>

                {/* onClick={() => setDownVote(downVote - 1) */}
                <button
                  class="flex items-center px-2 py-2  mx-2 transition ease-in duration-200 uppercase rounded hover:bg-gray-800 text-black  hover:text-white border-2 border-gray-400 focus:outline-none"
                  onClick={selectedClicked}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 17l-4 4m0 0l-4-4m4 4V3"
                    />
                  </svg>
                  {selected.votesdown.length}
                </button>
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
