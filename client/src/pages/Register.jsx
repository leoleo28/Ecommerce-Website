import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi-browser";
import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "../redux/userRedux";
import { modifyCart, modifyFavorite } from "../redux/cartRedux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-image: url("/img/background.jpeg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  box-sizing: border-box;
  padding: 60px;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background: transparent;
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Error = styled.div`
  color: red;
`;

const Button = styled.button`
  width: 40%;
  margin-top: 20px;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: lightblue;
  }
`;

const Login = styled.div`
  font-size: 14px;
  margin-bottom: 15px;
  cursor: pointer;
  color: white;
  margin: 20px 0px;
`;

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const [registerinfo, setRegisterinfo] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching, error, currentUser } = useSelector((state) => state.user);
  const schema = {
    username: Joi.string()
      .alphanum()
      .min(1)
      .max(30)
      .required()
      .label("Username"),
    password: Joi.string().required().label("Password"),
    email: Joi.string().email().required().label("Email"),
  };

  const validate = () => {
    const result = Joi.validate(credentials, schema, { abortEarly: false });
    const errors = {};
    if (!result.error) return null;
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const errorinfo = validate();
    setRegisterinfo(errorinfo || {});
    if (errorinfo) return;
    dispatch(loginStart());
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/auth/register`,
        credentials
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch(loginSuccess(res.data));

      const cart_num = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/carts/find`,
        {
          headers: {
            xauthtoken: res.data.xauthtoken,
          },
        }
      );
      const cartNumber =
        cart_num.data === null ? 0 : cart_num.data.products.length;
      dispatch(modifyCart(cartNumber));

      const favorite_num = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/favorites/find`,
        {
          headers: {
            xauthtoken: res.data.xauthtoken,
          },
        }
      );
      const favoriteNumber =
        favorite_num.data === null ? 0 : favorite_num.data.products.length;
      dispatch(modifyFavorite(favoriteNumber));
      toast("User created");
      navigate("/");
    } catch (err) {
      dispatch(loginFailure(err.response.data.message));
      toast.error(err.response.data.message);
    }
  };

  const loginPage = () => {
    navigate("/login");
  };

  if (currentUser) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <Container>
        <ToastContainer />
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form>
            <Input
              placeholder="username"
              id="username"
              onChange={handleChange}
            />
            {registerinfo["username"] && (
              <Error>{registerinfo["username"]}</Error>
            )}
            <Input placeholder="email" id="email" onChange={handleChange} />
            {registerinfo["email"] && <Error>{registerinfo["email"]}</Error>}
            <Input
              placeholder="password"
              type="password"
              id="password"
              onChange={handleChange}
            />
            {registerinfo["password"] && (
              <Error>{registerinfo["password"]}</Error>
            )}
            <Button onClick={handleClick} disabled={isFetching}>
              CREATE
            </Button>
            <Login onClick={loginPage}>Already have an account ? Login </Login>
            <Link to="/" style={{ color: "white", fontSize: "14px" }}>
              Back to Home Page
            </Link>
          </Form>
        </Wrapper>
      </Container>
    );
  }
};

export default Register;
