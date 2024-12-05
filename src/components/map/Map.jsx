import { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import RoadDevice from "./RoadDevice";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";
import axios from "axios";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null); // Usamos useRef para almacenar el marcador
  const lng = -76.98937836368721;
  const lat = -12.076365861631718;
  const zoom = 14;
  const API_KEY = import.meta.env.VITE_REACT_MAPLIBRE_API_KEY;
  const [roadDevices, setRoadDevices] = useState([]);
  const [stateMarker, setStateMarker] = useState(null);
  const [, setMarkers] = useState([]);
  const [, setAddress] = useState("");
  const [, setBlock] = useState("");
  const [, setLoading] = useState(false);

  useEffect(() => {
    if (map.current) return; // Evita que el mapa se inicialice más de una vez

    // Crear el mapa
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });

    // Añadir controles de navegación
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    // Evento de clic en el mapa
    map.current.on("click", (e) => {
      const { lng, lat } = e.lngLat; // Obtener las coordenadas donde se hace clic

      // Eliminar el marcador anterior si existe
      if (marker.current) {
        marker.current.remove(); // Eliminar el marcador anterior
      }

      // Crear un nuevo marcador
      const new_marker = new maplibregl.Marker({
        color: "#FF4000",
        scale: 0.5,
      })
        .setLngLat([lng, lat]) // Establecer las coordenadas del marcador
        .addTo(map.current); // Añadirlo al mapa

      // Actualizar la referencia del marcador
      marker.current = new_marker;
      setStateMarker(new_marker);
    });
  }, []); // Este efecto se ejecuta solo una vez cuando se monta el componente

  // Función para obtener la dirección a partir de las coordenadas
  const getAddressFromCoordinates = async (lon, lat) => {
    setLoading(true);
    const apiKey = import.meta.env.VITE_REACT_OPENCAGE_API_KEY;
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json`,
        {
          params: {
            q: `${lat},${lon}`,
            key: apiKey,
            language: "es",
            pretty: 1,
            no_annotations: 1,
          },
        }
      );
      const addressData = response.data.results[0];
      if (addressData) {
        setAddress(addressData.formatted);
        const components = addressData.components;
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
  const addRoadDevice = () => {
    if (map.current) {
      setRoadDevices([...roadDevices, <RoadDevice key={roadDevices.length} />]);
    }
  };
  return (
    <div>
      <div>
        {stateMarker ? (
          <>
            <p className="">Nuevo marcador</p>
            <button
              type="button"
              onClick={addRoadDevice} // Función de agregar dispositivo vial
            >
              Agregar dispositivo vial
            </button>
          </>
        ) : (
          <p>Ningún marcador por configurar</p>
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
