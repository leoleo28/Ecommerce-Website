import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ShoppingCartOutlined,
  FavoriteBorderOutlined,
  CancelOutlined,
} from "@material-ui/icons";
import { modifyCart, modifyFavorite } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";
import Userinfo from "../components/User";
import Progress from "../components/Progress";
import { toast } from "react-toastify";
const Container = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 80%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Star = styled.div`
  margin: 30px 0px;
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/products/find/` + id
        );
        setProduct(res.data);
        setSize(res.data.size[0]);
      } catch (err) {
        toast.error("Something went wrong");
        console.log(err);
      }
      setLoading(false);
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleCart = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_SERVER}/api/carts`,
        {
          userId: currentUser._id,
          products: [
            {
              productId: id,
              quantity,
              size,
              productTitle: product.title,
              productPrice: (product.price * quantity).toFixed(2),
              productImg: product.img,
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
      setOpen(true);
      toast("please login first");
    }
  };

  const handleFavorite = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_SERVER}/api/favorites`,
        {
          userId: currentUser._id,
          products: [
            {
              productId: id,
              size,
              productTitle: product.title,
              productPrice: product.price.toFixed(2),
              productImg: product.img,
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
      setOpen(true);
      toast("please login first");
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      {open && <Userinfo setOpen={setOpen} />}
      {loading ? (
        <Progress />
      ) : (
        <Wrapper>
          <ImgContainer>
            <Image src={product.img} />
          </ImgContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.desc}</Desc>
            <Price>$ {product.price}</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                <FilterColor color="black" />
                <FilterColor color="darkblue" />
                <FilterColor color="pink" />
                <FilterColor color="yellow" />
                <FilterColor color="orange" />
                <FilterColor color="cyan" />
                <FilterColor color="whitesmoke" />
                <FilterColor color="gray" />
              </Filter>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize onChange={(e) => setSize(e.target.value)}>
                  {product.size?.map((s) => (
                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  ))}
                </FilterSize>
              </Filter>
            </FilterContainer>
            <Star>
              <Rating
                name="Rating Label"
                value={4.5}
                size="large"
                precision={0.5}
                readOnly
              />
            </Star>
            <AddContainer>
              <AmountContainer>
                <Remove
                  onClick={() => handleQuantity("dec")}
                  style={{ cursor: "pointer" }}
                />
                <Amount>{quantity}</Amount>
                <Add
                  onClick={() => handleQuantity("inc")}
                  style={{ cursor: "pointer" }}
                />
              </AmountContainer>
              <ShoppingCartOutlined
                onClick={handleCart}
                style={{ cursor: "pointer", marginLeft: "25px" }}
              />
              <FavoriteBorderOutlined
                onClick={handleFavorite}
                style={{ cursor: "pointer", marginLeft: "25px" }}
              />
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      )}
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
