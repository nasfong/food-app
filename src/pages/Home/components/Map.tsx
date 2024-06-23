import { location } from '@/constant/constant';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px'
};


const Map = () => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBVR6OkfLXHW82kWhxyeqOFnuyWlNzHwLM"
  })

  const [_, setMap] = useState(null)

  // const onLoad = useCallback(function callback(map: any) {
  //   // This is just an example of getting and using the map instance!!! don't just blindly copy!
  //   const bounds = new window.google.maps.LatLngBounds(location);
  //   map.fitBounds(bounds);

  //   setMap(map)
  // }, [])

  const onUnmount = useCallback(function callback(_: any) {
    setMap(null)
  }, [])
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location}
      zoom={15}
      // onLoad={onLoad}
      onUnmount={onUnmount}
    >

      <Marker
        position={location}
        label={{
          text: "Maom Khmer Cuisine", // Change this to your desired label text
          color: "#34a854", // Optional: change the color of the label text
          fontSize: "16px", // Optional: change the font size of the label text
          fontWeight: "bold" // Optional: change the font weight of the label text
        }}
      ></Marker>
    </GoogleMap>
  ) : <></>
}

export default Map
