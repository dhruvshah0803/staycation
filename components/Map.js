import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import Image from "next/image";

const Map = ({ searchResults, className, dark }) => {
  const coordinates = searchResults.map((result) => ({
    latitude: result.lat,
    longitude: result.long,
  }));

  const { latitude, longitude } = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom: 9,
  });



  const [selectedLocation, setSelectedLocation] = useState({
      "img":"https://a0.muscache.com/im/pictures/39b5aad2-7364-4957-9671-dfc82c9131c6.jpg?im_w=1200",
      "location":"Fagu, Himanchal Pradesh",
      "title":"Tree house | Duplex | Balcony With Himalayan View",
      "description":"3 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen · Free parking · Washing Machine",
      "star":3.85,
      "price":" ₹3428/ night",
      "total":"₹4870 total",
      "lat":19.748060,
      "long":73.300851
  });

  return (
    <ReactMapGL
      mapStyle={
        dark
          ? process.env.NEXT_PUBLIC_MAPBOX_STYLE_DARK_URL
          : process.env.NEXT_PUBLIC_MAPBOX_STYLE_DARK_URL
      }
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN}
      {...viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
      width="100%"
      height="100%"
      className={className}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetTop={-15}
            offsetLeft={-15}
          >
            <p
              onClick={() => {
                setSelectedLocation(result);
              }}
              role="image"
              aria-label="push-pin"
            >
              <LocationMarkerIcon className="h-5 text-red-400 animate-bounce cursor-pointer" />
            </p>
          </Marker>
          {selectedLocation.long === result.long ? (
            <Popup
              closeOnClick={true}
              onClose={() => setSelectedLocation({})}
              latitude={result.lat}
              longitude={result.long}
              className="w-[150px] h-[250px] rounded-lg"
            >
              <Image
              alt = "img"
                src={result.img}
                height="170px"
                width="150px"
                objectFit="cover"
              />
              <br />
              <span className="text-md font-mono font-medium">
                {result.title}
              </span>
              <br />
              <span className="text-sm font-mono font-medium">
                {result.price}
              </span>
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
