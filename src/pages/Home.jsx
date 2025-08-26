import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../assets/css/pages.css";
import AuthContext from "../context/AuthContext";

// token: 387a65803a06ff

export default function Home() {
  // state variable
  const [geo, setGeo] = useState(null);
  const [ip, setIp] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  // adding loguout
  const { logout } = useContext(AuthContext);

  // fetch => show => add
  const fetchGeo = async (targetIp = "") => {
    try {
      const url = targetIp
        ? `https://ipinfo.io/${targetIp}/geo`
        : `https://ipinfo.io/json?token=387a65803a06ff`;
      const res = await axios.get(url);
      setGeo(res.data);
      setError("");
      if (targetIp) setHistory((prev) => [...prev, res.data]);
    } catch {
      setError("Invalid IP address");
    }
  };
  // if it work, then show
  useEffect(() => {
    fetchGeo();
  }, []);

  const handleSearch = () => {
    // using regex then fetch
    if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(ip)) {
      fetchGeo(ip);
    } else {
      setError("Please enter a valid IP address");
    }
  };

  return (
    <>
      <button onClick={logout} className="btn btn-search">
      LogOut
      </button>
    <div className="container">
      <h2 className="title">🌐 IP Geolocation 🌐</h2>
      <div className="input-group">
        <input
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="Enter IP Address"
          className="input"
        />
        <button onClick={handleSearch} className="btn btn-search">
          Search
        </button>
        <button
          onClick={() => {
            setIp("");
            fetchGeo();
          }}
          className="btn btn-clear"
        >
          Clear
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}

      {/* more info for geo location  */}
      {geo && (
        <div className="card">
          <h3 className="card-title">Geolocation Info</h3>
          <div className="card-grid">
            <div>
              <span className="label">IP:</span> {geo.ip}
            </div>
            <div>
              <span className="label">City:</span> {geo.city}
            </div>
            <div>
              <span className="label">Region:</span> {geo.region}
            </div>
            <div>
              <span className="label">Country:</span> {geo.country}
            </div>
            <div>
              <span className="label">Location:</span> {geo.loc}
            </div>
            <div className="span-2">
              <span className="label">Organization:</span> {geo.org}
            </div>
            <div>
              <span className="label">Postal:</span> {geo.postal}
            </div>
            <div>
              <span className="label">Timezone:</span> {geo.timezone}
            </div>
          </div>
        </div>
      )}
      {/* show history */}
      {history.length > 0 && (
        <div className="card" style={{ marginTop: "20px" }}>
          <h3 className="card-title">Search History</h3>
          <ul>
            {history.map((h, i) => (
              <li key={i}>
                {h.ip} - {h.city}, {h.country}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  );
}
