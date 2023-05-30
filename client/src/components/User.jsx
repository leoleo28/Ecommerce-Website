import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import Joi from "joi-browser";
import styled from "styled-components";
import { CancelOutlined } from "@material-ui/icons";
import { loginFailure, loginStart, loginSuccess } from "../redux/userRedux";
import { modifyCart, modifyFavorite } from "../redux/cartRedux";

const UserContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.613);
  border: 2px solid green;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 30px;
  font-size: 30px;
  color: lightgray;
  cursor: pointer;
`;

const Form = styled.div`
  background: #fff;
  width: 300px;
  height: 500px;
  position: relative;
  text-align: center;
  padding: 20px 0;
  margin: auto;
  box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const FormBtn = styled.div`
  margin-bottom: 25px;
`;

const FormChoice = styled.span`
  margin: 10px 30px;
  cursor: pointer;
`;

const FormInput = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  transition: all 1.5s ease;
  left: ${(props) => (props.ty === "choice" ? "40px" : "-300px")};
`;

const Input = styled.input`
  width: 200px;
  height: 30px;
  margin: 20px 0;
  padding: 0 10px;
  outline: none;
`;

const Button = styled.button`
  width: 100px;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 20px 0;
`;

const Hr = styled.hr`
  width: 70px;
  border: none;
  height: 3px;
  margin-top: 8px;
  background: teal;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.pos}px);
`;

const Error = styled.div`
  color: red;
  padding: 0px 10px;
`;

const User = ({ setOpen }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usercredentials, setUserCredentials] = useState({
    User_username: undefined,
    User_email: undefined,
    User_password: undefined,
  });
  const [registerinfo, setRegisterinfo] = useState({});
  const schema = {
    User_username: Joi.string()
      .alphanum()
      .min(1)
      .max(30)
      .required()
      .label("Username"),
    User_password: Joi.string().required().label("Password"),
    User_email: Joi.string().email().required().label("Email"),
  };

  const validate = () => {
    const result = Joi.validate(usercredentials, schema, { abortEarly: false });
    const errors = {};
    if (!result.error) return null;
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setUserCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const errorinfo = validate();
    setRegisterinfo(errorinfo || {});
    if (errorinfo) return;
    dispatch(loginStart());
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/auth/register`,
        {
          username: usercredentials.User_username,
          email: usercredentials.User_email,
          password: usercredentials.User_password,
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
      navigate("/");
    } catch (err) {
      toast.error("Something went wrong");
      dispatch(loginFailure(err.response.data.message));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
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
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
      dispatch(loginFailure(err.response.data.message));
    }
  };

  const [choice, setChoice] = useState({
    register: "",
    login: "choice",
    hr: 57,
  });

  const handleChoice = (ty) => {
    if (ty === "login") {
      const newty = { login: "choice", register: "", hr: 57 };
      setChoice(newty);
      setRegisterinfo({});
    } else {
      const newty = { login: "", register: "choice", hr: 165 };
      setChoice(newty);
    }
  };

  return (
    <UserContainer>
      <Close>
        <CancelOutlined onClick={() => setOpen(false)} />
      </Close>
      <Form>
        <FormBtn>
          <FormChoice onClick={() => handleChoice("login")}>Login</FormChoice>
          <FormChoice onClick={() => handleChoice("register")}>
            Register
          </FormChoice>
          <Hr pos={choice.hr} />
        </FormBtn>
        <FormInput ty={choice.register}>
          <Input
            placeholder="username"
            id="User_username"
            onChange={handleChange}
          />
          {registerinfo["User_username"] && (
            <Error>{registerinfo["User_username"]}</Error>
          )}
          <Input placeholder="email" id="User_email" onChange={handleChange} />
          {registerinfo["User_email"] && (
            <Error>{registerinfo["User_email"]}</Error>
          )}
          <Input
            placeholder="password"
            type="password"
            id="User_password"
            onChange={handleChange}
          />
          {registerinfo["User_password"] && (
            <Error>{registerinfo["User_password"]}</Error>
          )}
          <Button onClick={handleRegister} disabled={isFetching}>
            Register
          </Button>
        </FormInput>
        <FormInput ty={choice.login}>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} disabled={isFetching}>
            Login
          </Button>
        </FormInput>
      </Form>
    </UserContainer>
  );
};

export default User;
