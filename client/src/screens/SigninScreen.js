import Container from "react-bootstrap/Container";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from 'react-router-dom'
export default function SigninScreen() {
    // using React Router hook (useLocation)
    const { search } = useLocation(); 
    // receiving search as object and pass "redirect" in URL query
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    // if redirectURL exists then assign it to redirect
    // else redirect = " / " (go to home page)
    const redirect = redirectInUrl ? redirectInUrl : '/';
  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>

      <Form>
        <Form.Group className="mb-3" controlId= "email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required />
        </Form.Group>

        <div className="mb-3">
            <Button type="submit">Sign In</Button>
        </div>

        <div className="mb-3">
            New Customer? {' '}
            <Link to={`/signup?redirect=${redirect}`}>
                Create your Account
            </Link>
        </div>
      </Form>
    </Container>

  );
}