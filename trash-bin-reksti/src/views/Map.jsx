import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
import "./Map.css";
import trashBinLogo from "../assets/tempat.png"

function Map() {

  const position = [-6.880240916378858, 107.6045913108843];

  const containerStyle = {
    width: "260px",
    height: "600px",
  };
  const appStyle = {
    padding: '30px 30px 30px 30px',
    backgroundColor: "rgba(48, 134, 163, 0.05)",
    borderRadius: "30px",
    marginLeft: 36,
    marginTop: 15,
    marginRight: 36
  };

  return (
    <div>
      <h1  style= {{marginTop: 80, fontWeight: "bold", font: "Inter", color: "#3086A3", textAlign: "center"}}>Pemetaan Sampah</h1>
      <div className="App" style ={appStyle}>
        <div className="map-container" style={containerStyle}>
          <MapContainer
            center={position}
            zoom={25}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Link to="/level">
              <Marker position={position} icon={DefaultIcon}>
                <Popup className="custom-popup">
                  Lokasi: 
                  <text style = {{font: "Inter", fontWeight: "bold"}}> Galeri Ciumbuleuit Apartment 2</text>
                  < br/>Status: 
                  <text style = {{font: "Inter", fontWeight: "bold", color:"red"}}> Penuh</text>
                </Popup>
              </Marker>
            </Link>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

const DefaultIcon = L.icon({
  iconUrl: trashBinLogo,
  iconSize: [60, 60],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default Map;
