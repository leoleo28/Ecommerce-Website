import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { modifyCart } from "../redux/cartRedux";

const Success = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const cartCheckOut = async () => {
      try {
        await axios.put(
          `${process.env.REACT_APP_SERVER}/api/carts/checkout`,
          { userId: currentUser._id },
          {
            headers: {
              xauthtoken: currentUser.xauthtoken,
            },
          }
        );
        dispatch(modifyCart(0));
      } catch (err) {
        console.log(err);
      }
    };
    cartCheckOut();
  }, []);

  return (
    <div
      className="grid place-items-center w-full lg:h-screen h-full
     font-raleway bg-[#F7F7F7]"
    >
      <div className="max-w-5xl rounded flex flex-col">
        <span className="text-green-600 text-5xl">Payment successful</span>
        <div className="flex justify-end items-center mx-auto my-24 w-60">
          <img src="/img/success.png" alt="" />
        </div>
        <div className="my-10 mx-auto">
          <Link to="/" className="underline text-xl underline-offset-4">
            Back to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
