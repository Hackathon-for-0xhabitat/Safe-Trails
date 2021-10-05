import './MapDisplay.css';

import React, { useState, useRef, useCallBack, useEffect } from 'react';
import {
   GoogleMap,
   useLoadScript,
   useJsApiLoader,
   Marker,
   InfoWindow,
} from '@react-google-maps/api';

import usePlacesAutocomplete, {
   getGeocode,
   getLatLng,
} from 'use-places-autocomplete';
import {
   Combobox,
   ComboboxInput,
   ComboboxPopover,
   ComboboxList,
   ComboboxOption,
} from '@reach/combobox';

import { formatRelative } from 'date-fns';
import '@reach/combobox/styles.css';

import mapStyles from './mapStyles';

const libraries = ['places'];

const mapContainerStyle = {
   width: '100vw',
   height: '100vh',
};

const center = {
   lat: 52.520008,
   lng: 13.404954,
};
const options = {
   styles: mapStyles,
   disableDefaultUI: true,
   zoomcontrol: true,
};

const MapDisplay = ({ coOrdinates, marker }) => {
   const { isLoaded, loadError } = useJsApiLoader({
      googleMapsApiKey: 'AIzaSyDZm5P_EhxPjg23_BRvxQl6sVUXrW1zSOY',
      libraries,
   });

   const [markers, setMarkers] = useState([]);
   const [selected, setSelected] = useState(null);
   const [clicked, setclicked] = useState(false);

   const onMapClick = React.useCallback((e) => {
      setclicked(true);
      coOrdinates({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      setMarkers((current) => [
         ...current,
         {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            time: new Date(),
         },
      ]);
   }, []);

   const mapRef = React.useRef();
   const onMapLoad = React.useCallback((map) => {
      mapRef.current = map;
   }, []);

   const panTo = React.useCallback(({ lat, lng }) => {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(16);
   }, []);

   //Up-Vote-Down-Vote
   const [upVote, setUpVote] = useState(0);
   const [downVote, setDownVote] = useState(0);

   if (loadError) return 'Error loading maps';
   if (!isLoaded) return 'Loading Maps';

   // const address= https://maps.googleapis.com/maps/api/geocode/json?latlng=44.4647452,7.3553838&key=YOUR_API_KEY
   return (
      <div>
         <h1 className="text-4xl font-bold">Safe Trails</h1>
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
               <Marker
                  position={{ lat: marker.lat, lng: marker.lng }}
                  icon={{
                     url: '/biking.png',
                     scaledSize: new window.google.maps.Size(50, 50),
                     origin: new window.google.maps.Point(0, 0),
                     anchor: new window.google.maps.Point(30, 30),
                  }}
               />
            )}

            {/* {allMarkers.length > 0 && allMarkers.map((marker) => (
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
        ))} */}
            {selected ? (
               <InfoWindow
                  position={{ lat: selected.lat, lng: selected.lng }}
                  onCloseClick={() => {
                     setSelected(null);
                  }}
               >
                  <div>
                     <h2 className="text-xl font-semibold">Bad Road!</h2>
                     <p>Time: {formatRelative(selected.time, new Date())}</p>
                     <button onClick={() => setUpVote(upVote + 1)}>
                        Up Vote
                     </button>
                     <p>{upVote}</p>
                     <button onClick={() => setDownVote(downVote - 1)}>
                        Down Vote
                     </button>
                     <p>{downVote}</p>
                  </div>
               </InfoWindow>
            ) : null}
         </GoogleMap>
      </div>
   );
};

export default MapDisplay;

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
                  });
               },
               () => null
            );
         }}
      >
         <img src="/thumb-compass.png" alt="compass" />
      </button>
   );
};

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
   });

   const handleInput = (e) => {
      setValue(e.target.value);
   };

   const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();

      try {
         const results = await getGeocode({ address });
         const { lat, lng } = await getLatLng(results[0]);
         panTo({ lat, lng });
      } catch (error) {
         console.log('😱 Error: ', error);
      }
   };

   return (
      <div className="search">
         <Combobox onSelect={handleSelect}>
            <ComboboxInput
               value={value}
               onChange={handleInput}
               disabled={!ready}
               placeholder="Search your location"
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
   );
};
