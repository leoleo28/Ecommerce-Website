import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import useFetch from "../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { modifyFavorite } from "../redux/cartRedux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Progress from "../components/Progress";
import { toast } from "react-toastify";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  width: 1024px;
  margin-left: auto;
  margin-right: auto;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColorContainer = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-left: 5px;
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Button = styled.button`
  width: 40%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  margin-top: 30px;
  cursor: pointer;
`;

const Favorite = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { data, loading, error, reFetch } = useFetch(
    `${process.env.REACT_APP_SERVER}/api/favorites/find`,
    currentUser.xauthtoken
  );

  const dispatch = useDispatch();
  const { cart_num, favorite_num } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleClick = async (item) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER}/api/favorites`,
        {
          userId: currentUser._id,
          products: [
            {
              productId: item.productId,
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
      toast.success("Item removed");
      reFetch();
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      {error && (
        <div style={{ color: "white" }}>
          {toast.error("Something went wrong")}
        </div>
      )}
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => navigate("/")}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText onClick={() => navigate("/cart")}>
              Shopping Bag({cart_num})
            </TopText>
            <TopText>Your Wishlist ({favorite_num})</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {loading ? (
              <Progress />
            ) : (
              data?.products?.map((d, i) => (
                <Product key={i}>
                  <ProductDetail>
                    <Image src={d.productImg} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {d.productTitle}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {d.productId}
                      </ProductId>
                      <ProductColorContainer>
                        <ProductColor color="black" />
                        <ProductColor color="darkblue" />
                        <ProductColor color="pink" />
                        <ProductColor color="yellow" />
                        <ProductColor color="orange" />
                        <ProductColor color="cyan" />
                        <ProductColor color="whitesmoke" />
                        <ProductColor color="gray" />
                      </ProductColorContainer>
                      <ProductSize>
                        <b>Size:</b> {d.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductPrice>$ {d.productPrice}</ProductPrice>
                    <Button onClick={() => handleClick(d)}>Remove</Button>
                  </PriceDetail>
                </Product>
              ))
            )}
          </Info>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Favorite;
