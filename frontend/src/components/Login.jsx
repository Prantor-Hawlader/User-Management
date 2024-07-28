import { useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, error } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    await login(emailRef.current.value, passwordRef.current.value);
  }

  return (
    <MDBContainer className="py-5 h-100">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol className="col-12 col-md-8 col-lg-6 col-xl-5">
          <MDBCard
            className="bg-dark text-white"
            style={{ borderRadius: "1rem" }}
          >
            <MDBCardBody className="p-5 text-center h-100">
              <form onSubmit={handleSubmit}>
                <div className="mb-md-5 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-3">
                    Please enter your login and password!
                  </p>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <MDBInput
                    label="Email"
                    id="typeEmailX"
                    type="email"
                    ref={emailRef}
                    size="lg"
                    className="mb-3 text-success"
                    labelClass="text-success"
                    required
                  />
                  <MDBInput
                    label="Password"
                    id="typePasswordX"
                    type="password"
                    ref={passwordRef}
                    size="lg"
                    className="mb-3 text-success"
                    labelClass="text-success"
                    required
                  />

                  <MDBBtn outline color="light" size="lg" type="submit">
                    Login
                  </MDBBtn>
                </div>
              </form>

              <p>
                Don&apos;t have an account?
                <Link to="/register" className="text-success fw-bold">
                  Sign Up
                </Link>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
