import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 11.562108,
  lng: 104.888535
}; // Phnom Penh

const Map = () => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBVR6OkfLXHW82kWhxyeqOFnuyWlNzHwLM"
  })

  const [_, setMap] = useState(null)

  const onLoad = useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(_: any) {
    setMap(null)
  }, [])
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      
      <Marker position={center}></Marker>
    </GoogleMap>
) : <></>
}

export default Map
