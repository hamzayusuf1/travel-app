import React, { useRef, useEffect } from "react";

const Map = ({ center, zoom }) => {
  const mapRef = useRef();
  console.log(center, zoom);
  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });
    new window.google.maps.Marker({
      position: center,
      map,
    });
  }, [center, zoom]);

  return (
    <div ref={mapRef} className="w-full h-full mb-12">
      <h2>Map container</h2>
    </div>
  );
};

export default Map;
