import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(emailRef.current.value, passwordRef.current.value);
      console.log("Successfully login");

      navigate("/");
    } catch (error) {
      console.log("logout bertho");
      setError("Login Failed");
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Log In</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            ref={emailRef}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            ref={passwordRef}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>
    </div>
  );
}
