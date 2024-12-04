import Map from "./../components/map/Map";
import RoadDevice from "./../components/map/RoadDevice";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";
const HomePage = () => {
  return (
    <main className="container mx-auto p-8">
      <section className="mx-9">
        <RoadDevice />
        <Map />
      </section>
    </main>
  );
};

export default HomePage;
