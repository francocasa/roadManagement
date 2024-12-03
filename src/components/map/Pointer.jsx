import { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./../../pages/map.css";
const Pointer = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const lng = -76.98937836368721;
  const lat = -12.076365861631718;
  const zoom = 14;
  const API_KEY = "wFsm7RvZB3i56B1sEk2n";

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
    new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([lng, lat])
      .addTo(map.current);

    // Manejar el evento de clic en el mapa
    map.current.on("click", (e) => {
      const { lng, lat } = e.lngLat; // Obtener las coordenadas del clic
      getPostalCode(lng, lat); // Obtener el código postal
    });

    // return () => {
    //   map.current.remove(); // Limpiar el mapa al desmontar el componente
    // };
  }, [API_KEY, lng, lat, zoom]);

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

  return <div></div>;
};

export default Pointer;
