import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { mobile } from "../responsive";
import { logOut } from "../redux/userRedux";
import { modifyCart, modifyFavorite } from "../redux/cartRedux";
import { Badge } from "@material-ui/core";
import {
  Search,
  ShoppingCartOutlined,
  FavoriteBorderOutlined,
} from "@material-ui/icons";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })};
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 5;
  background-color: #fffaf0;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid #fffaf0;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  &:focus {
    outline: none;
  }
  padding: 5px;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  background-color: red;
  background-image: linear-gradient(45deg, #f3ec78, #af4261);
  background-size: 100%;
  background-repeat: repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const { cart_num, favorite_num } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(modifyCart(0));
    dispatch(modifyFavorite(0));
    localStorage.removeItem("user");
    toast("Logout successfully");
    navigate("/");
  };

  const handleClick = (type) => {
    if (currentUser) navigate(`/${type}`);
    else navigate("/login");
  };

  return (
    <Container>
      <ToastContainer />
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            Ecommerce Store
          </Logo>
        </Center>
        <Right>
          {!currentUser && (
            <MenuItem onClick={() => navigate("/register")}>REGISTER</MenuItem>
          )}
          {!currentUser && (
            <MenuItem onClick={() => navigate("/login")}>SIGN IN</MenuItem>
          )}
          {currentUser && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
          <MenuItem>
            <Badge
              badgeContent={cart_num}
              color="primary"
              overlap="rectangular"
              onClick={() => handleClick("cart")}
            >
              <ShoppingCartOutlined />
            </Badge>
            <Badge
              badgeContent={favorite_num}
              color="primary"
              overlap="rectangular"
              style={{ marginLeft: "25px" }}
              onClick={() => handleClick("favorite")}
            >
              <FavoriteBorderOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
