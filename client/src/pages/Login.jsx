import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate, Link } from "react-router-dom";
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
  padding: 70px;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 50px 30px;
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
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    background-color: lightblue;
  }
`;

const Text = styled.a`
  margin: 5px 0px;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  color: white;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, currentUser } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginStart());
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/auth/login`,
        {
          username,
          password,
        }
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
      toast("Login Successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
      dispatch(loginFailure(err.response.data.message));
    }
    setLoading(false);
  };

  const registerPage = () => {
    navigate("/register");
  };

  if (currentUser) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <Container>
        <ToastContainer />
        <Wrapper>
          <Title>SIGN IN</Title>
          <Form>
            <Input
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleClick} disabled={loading}>
              LOGIN
            </Button>
            <Text onClick={registerPage}>Create New Account</Text>
            <Link to="/" style={{ color: "white", fontSize: "14px" }}>
              Back to Home Page
            </Link>
          </Form>
        </Wrapper>
      </Container>
    );
  }
};

export default Login;
