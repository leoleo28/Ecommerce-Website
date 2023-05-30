import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import useFetch from "../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { modifyCart } from "../redux/cartRedux";
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
  cursor: ${(props) => props.notallow === "true" && "not-allowed"};
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
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
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

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: ${(props) => props.notallow === "true" && "not-allowed"};
`;

const Cart = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { data, loading, error, reFetch, total } = useFetch(
    `${process.env.REACT_APP_SERVER}/api/carts/find`,
    currentUser.xauthtoken
  );

  const dispatch = useDispatch();
  const { cart_num, favorite_num } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const handleClick = async (item, type) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_SERVER}/api/carts`,
        {
          userId: currentUser._id,
          products: [
            {
              productId: item.productId,
              quantity: type === "add" ? item.quantity + 1 : item.quantity - 1,
              size: item.size,
              productTitle: item.productTitle,
              productPrice:
                type === "add"
                  ? (
                      item.productPrice +
                      item.productPrice / item.quantity
                    ).toFixed(2)
                  : (
                      item.productPrice -
                      item.productPrice / item.quantity
                    ).toFixed(2),
              productImg: item.productImg,
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
      toast.success("Update successfully");
      reFetch();
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  const handleCheckout = async () => {
    if (loading) return;
    const items = data?.products?.map((d, i) => {
      return {
        id: i,
        name: d.productTitle,
        quantity: d.quantity,
        price: d.productPrice.toFixed(2) / d.quantity,
      };
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/checkout/create-checkout-session`,
        JSON.stringify({
          items: items,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.request.status === 200) {
        window.location = res.data.url;
      } else throw new Error("Something went wrong!");
    } catch (err) {
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
            <TopText>Shopping Bag({cart_num})</TopText>
            <TopText onClick={() => navigate("/favorite")}>
              Your Wishlist ({favorite_num})
            </TopText>
          </TopTexts>
          <TopButton
            type="filled"
            onClick={handleCheckout}
            disabled={loading || cart_num === 0}
            notallow={loading || cart_num === 0 ? "true" : "false"}
          >
            CHECKOUT NOW
          </TopButton>
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
                      <ProductSize>
                        <b>Size:</b> {d.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add
                        onClick={() => handleClick(d, "add")}
                        style={{ cursor: "pointer" }}
                      />
                      <ProductAmount>{d.quantity}</ProductAmount>
                      <Remove
                        onClick={() => handleClick(d, "remove")}
                        style={{ cursor: "pointer" }}
                      />
                    </ProductAmountContainer>
                    <ProductPrice>$ {d.productPrice.toFixed(2)}</ProductPrice>
                  </PriceDetail>
                </Product>
              ))
            )}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              {loading ? (
                <Progress />
              ) : (
                <SummaryItemPrice>$ {total}</SummaryItemPrice>
              )}
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              {loading ? (
                <Progress />
              ) : (
                <SummaryItemPrice>$ {total}</SummaryItemPrice>
              )}
            </SummaryItem>
            <Button
              onClick={handleCheckout}
              disabled={loading || cart_num === 0}
              notallow={loading || cart_num === 0 ? "true" : "false"}
            >
              CHECKOUT NOW
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
