import Container from "react-bootstrap/Container";
import Axios from "axios";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { getError } from "../utils";

export default function SigninScreen() {
  const navigate = useNavigate();

  // using React Router hook (useLocation)
  const { search } = useLocation();
  // receiving search as object and pass "redirect" in URL query
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  // if redirectURL (shipping page) exists then assign it to redirect
  // else redirect = " / " (go to home page)
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    // prevent refreshing the page when use clicks Sign in Btn
    e.preventDefault();
    try {
      const { data } = await Axios.post("/api/users/signin", {
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });

      // stores users credentials in the local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      // go to shipping page, if it is not exist then go to home page
      navigate(redirect || "/");
    } catch (err) {
      alert(getError(err)); // getError func coming from utils
    }
  };

  // if user already logged in, redirect to shipping page
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>

        <div className="mb-3">
          New Customer?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create your Account</Link>
        </div>
      </Form>
    </Container>
  );
}
