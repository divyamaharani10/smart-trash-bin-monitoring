import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
// import { Link } from "react-router-dom";
import "./Map.css";
import trashBinLogo from "../assets/tempat.png"
import { MarginRounded, Padding } from "@mui/icons-material";



function Map() {

  const position = [-6.905935365864227, 107.61778320709041];

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
  // const textSectionStyle = {
  //   position: "absolute",
  //   bottom: "0",
  //   left: "0",
  //   width: "100%",
  //   padding: "10px",
  //   backgroundColor: "#FFF",
  //   borderRadius: "0 0 30px 30px",
  //   textAlign: "left",
  //   marginLeft: 36,
  //   fontWeight: "bold",
  //   fontSize: 18,
  //   font: "Helvetica Neue"
  // };
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
            <Marker position={position} icon={DefaultIcon}>
              <Popup className="custom-popup">
                Lokasi: 
                <text style = {{font: "Inter", fontWeight: "bold"}}> GCA 2 Cimbuleuit</text>
                < br/>Status: 
              </Popup>
            </Marker>
            {/* <Link to="./tes">
              <Marker position={position} icon={DefaultIcon}></Marker>
            </Link> */}
          </MapContainer>
            {/* <div style={textSectionStyle}>
              <p>Tempat Sampah Terkunci</p>
              <p>Tempat Sampah Kosong</p>
            </div> */}
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
