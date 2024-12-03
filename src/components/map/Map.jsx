import { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./../../pages/map.css";
const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const lng = -76.98937836368721;
  const lat = -12.076365861631718;
  const zoom = 14;
  const API_KEY = "wFsm7RvZB3i56B1sEk2n";
  const [postalCode, setPostalCode] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [mark, setMark] = useState([]);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    // Manejar el evento de clic en el mapa
    map.current.on("click", (e) => {
      const { lng, lat } = e.lngLat; // Obtener las coordenadas del clic
      setMark([lng, lat]);
      getPostalCode(lng, lat); // Obtener el código postal
    });

    // return () => {
    //   map.current.remove(); // Limpiar el mapa al desmontar el componente
    // };
  }, [API_KEY, lng, lat, zoom]);

  const addMarker = () => {
    if (map.current) {
      const marker = new maplibregl.Marker({ color: "#FF0000" })
        .setLngLat([mark[0], mark[1]])
        .addTo(map.current);
      setMarkers((prevMarkers) => [...prevMarkers, marker]);
    }
  };

  const removeMarker = (index) => {
    if (markers[index]) {
      markers[index].remove(); // Eliminar la marca específica
      setMarkers((prevMarkers) => prevMarkers.filter((_, i) => i !== index)); // Eliminarla del estado
    }
  };

  const getPostalCode = async (lng, lat) => {
    const apiKey = "8442a4ea01014d029f028b6c79f30971"; // Reemplaza con tu API Key de OpenCage
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Data:", data);

      if (data.results.length > 0) {
        const code = data.results[0].components.postcode;
        setPostalCode(code); // Actualizar el estado con el código postal
      } else {
        setPostalCode("Código postal no encontrado");
      }
    } catch (error) {
      console.error("Error al obtener el código postal:", error);
      setPostalCode("Error al obtener el código postal");
    }
  };

  return (
    <div>
      <div>
        {postalCode ? (
          <>
            <p className="">Código Postal: {postalCode}</p>
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={addMarker}
            >
              Green
            </button>
          </>
        ) : (
          <p>Haz clic en el mapa para obtener el código postal.</p>
        )}
      </div>
      <div className="map-wrap">
        <div ref={mapContainer} className="map" />
      </div>
    </div>
  );
};

export default Map;
