import Map from "./../components/map/Map";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";
const HomePage = () => {
  return (
    <main className="container mx-auto p-8">
      <section className="mx-9">
        <Map />
      </section>
    </main>
  );
};

export default HomePage;
