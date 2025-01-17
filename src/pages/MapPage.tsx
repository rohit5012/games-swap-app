import MapSidebar from "../components/MapSidebar";
import Map from "../components/Map";

const App: React.FC = () => {
  const locations = ["04770", "sw12 9ru"];
  return (
    <div className="flex">
      <MapSidebar />
      <Map postcode={locations} />
    </div>
  );
};

export default App;
