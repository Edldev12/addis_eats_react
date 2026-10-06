import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "./useAdminAuth";
import "./Admin.css";

function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const success = login(username.trim(), password);

    if (success) {
      setError("");
      navigate("/admin");
      return;
    }

    setError("Invalid username or password.");
  }

  return (
    <section className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-icon">🔐</div>

        <h1>Admin Login</h1>

        <p>
          Sign in to manage Addis Eats.
        </p>

        <form onSubmit={handleSubmit}>
          {error && (
            <p className="admin-error">
              {error}
            </p>
          )}

          <label htmlFor="username">
            Username
          </label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            placeholder="Enter username"
            required
          />

          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter password"
            required
          />

          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;