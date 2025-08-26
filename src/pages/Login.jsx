import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import AuthContext from "../context/AuthContext";
import "../assets/css/pages.css";

export default function Login() {
  // state hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // saving to localStorage
  const { login } = useContext(AuthContext);
  // home
  const navigate = useNavigate();

  // post reqq
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });
      login(res.data.token);
      navigate("/home");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Login</h1>
      <form onSubmit={handleSubmit} className="input-group">
        {/* test@example.com */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
        {/* password123 */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
        <button type="submit" className="btn btn-search">
          Login
        </button>
      </form>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
