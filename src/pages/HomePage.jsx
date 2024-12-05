import Map from "./../components/map/Map";
import "maplibre-gl/dist/maplibre-gl.css";
// import "./../components/map/map.css";
const HomePage = () => {
  return (
    <main className="container mx-auto p-8 bg-gray-500">
      <section className="mx-9">
        <Map />
      </section>
    </main>
  );
};

export default HomePage;
