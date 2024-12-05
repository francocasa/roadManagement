import { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import RoadDevice from "./RoadDevice";
import "maplibre-gl/dist/maplibre-gl.css";
import "./../../pages/map.css";
import axios from "axios";
const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const lng = -76.98937836368721;
  const lat = -12.076365861631718;
  const zoom = 14;
  const API_KEY = import.meta.env.VITE_REACT_MAPLIBRE_API_KEY;
  const [marker /*setMarker*/] = useState(null);
  const [roadDevices, setRoadDevices] = useState([]);
  const [, /*markers*/ setMarkers] = useState([]);
  const [mark, setMark] = useState([]);
  const [, /*address*/ setAddress] = useState("");
  const [, /*block*/ setBlock] = useState("");
  const [, /*loading*/ setLoading] = useState(false);

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
      getAddressFromCoordinates(lng, lat); // Obtener el código postal
    });

    // return () => {
    //   map.current.remove(); // Limpiar el mapa al desmontar el componente
    // };
  }, [API_KEY, lng, lat, zoom]);

  const addMarker = () => {
    if (map.current) {
      const marker = new maplibregl.Marker({
        color: "#FF4000",
        scale: 0.5,
      })
        .setLngLat([mark[0], mark[1]])
        .addTo(map.current);
      setMarkers((prevMarkers) => [...prevMarkers, marker]);
      setRoadDevices([...roadDevices, <RoadDevice key={roadDevices.length} />]);
    }
  };

  // const removeMarker = (index) => {
  //   if (markers[index]) {
  //     markers[index].remove(); // Eliminar la marca específica
  //     setMarkers((prevMarkers) => prevMarkers.filter((_, i) => i !== index)); // Eliminarla del estado
  //   }
  // };

  const getAddressFromCoordinates = async (lon, lat) => {
    setLoading(true);
    const apiKey = import.meta.env.VITE_REACT_OPENCAGE_API_KEY; // Reemplaza con tu API Key de OpenCage
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json`,
        {
          params: {
            q: `${lat},${lon}`,
            key: apiKey, // Tu clave de API
            language: "es", // Puedes cambiar el idioma según lo necesites
            pretty: 1, // Resultados más legibles
            no_annotations: 1, // Opcional: Evitar anotar datos extra
          },
        }
      );

      const addressData = response.data.results[0];
      if (addressData) {
        setAddress(addressData.formatted); // Dirección formateada completa
        // Buscar detalles adicionales en los componentes de la dirección
        const components = addressData.components;

        // Aquí tratamos de encontrar un número de cuadra o manzana si está disponible
        if (components.road && components.house_number) {
          setBlock(
            `Número de cuadra: ${components.road}, No. ${components.house_number}`
          );
        } else if (components.road) {
          setBlock(`Calle: ${components.road}`);
        } else {
          setBlock("Número de cuadra no encontrado");
        }
      } else {
        setAddress("Dirección no encontrada");
      }
    } catch (error) {
      console.error("Error al obtener la dirección:", error);
      setAddress("Error al obtener la dirección");
      setBlock("Error al obtener el número de cuadra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        {marker ? (
          <>
            <p className="">Marcador: {marker}</p>
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={addMarker}
            >
              Agregar dispositivo vial
            </button>
          </>
        ) : (
          <p>Ningun marcador por configurar</p>
        )}
        <div>
          {roadDevices.map((component, index) => (
            <div key={index}>{component}</div>
          ))}
        </div>
      </div>
      <div className="map-wrap">
        <div ref={mapContainer} className="map" />
      </div>
    </div>
  );
};

export default Map;
