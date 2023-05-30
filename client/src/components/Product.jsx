import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import styled from "styled-components";
import { modifyCart, modifyFavorite } from "../redux/cartRedux";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleCart = async () => {
    if (!currentUser) {
      toast("please login first");
      return;
    }
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER}/api/carts`,
        {
          userId: currentUser._id,
          products: [
            {
              productId: item._id,
              quantity: 1,
              size: item.size[0],
              productTitle: item.title,
              productPrice: item.price.toFixed(2),
              productImg: item.img,
            },
          ],
        },
        {
          headers: {
            xauthtoken: currentUser.xauthtoken,
          },
        }
      );

      const cart_num = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/carts/find`,
        {
          headers: {
            xauthtoken: currentUser.xauthtoken,
          },
        }
      );
      const cartNumber =
        cart_num.data === null ? 0 : cart_num.data.products.length;
      dispatch(modifyCart(cartNumber));
      toast.success("Item added to shopping cart");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleFavorite = async () => {
    if (!currentUser) {
      toast("please login first");
      return;
    }
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER}/api/favorites`,
        {
          userId: currentUser._id,
          products: [
            {
              productId: item._id,
              size: item.size[0],
              productTitle: item.title,
              productPrice: item.price.toFixed(2),
              productImg: item.img,
            },
          ],
        },
        {
          headers: {
            xauthtoken: currentUser.xauthtoken,
          },
        }
      );
      const favorite_num = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/favorites/find`,
        {
          headers: {
            xauthtoken: currentUser.xauthtoken,
          },
        }
      );
      const favoriteNumber =
        favorite_num.data === null ? 0 : favorite_num.data.products.length;
      dispatch(modifyFavorite(favoriteNumber));
      toast.success("Item added to favorite list");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon onClick={handleCart}>
          <ShoppingCartOutlined />
        </Icon>
        <Icon onClick={() => navigate(`/product/${item._id}`)}>
          <SearchOutlined />
        </Icon>
        <Icon onClick={handleFavorite}>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
