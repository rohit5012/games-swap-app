import MapSidebar from "../components/MapSidebar";
import Map from "../components/Map";

const App = () => {
  return (
    <div className="flex">
      <MapSidebar />
      <Map postcode="04770" />
    </div>
  );
};

export default App;
