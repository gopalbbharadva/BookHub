import React from "react";
import { FiHeart } from "react-icons/fi";
import { FaStar, FaHeart } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { useWishList } from "../../../contexts/WishListContext";
import "./ProductsListCard.css";
import { useNavigate } from "react-router";
import { useCart } from "../../../contexts/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDataStore } from "../../../contexts/DataStoreContext";

export const ProductsListCard = ({ product }) => {
  const { title, imgSrc, author, costPrice, sellPrice, discount, ratings } =
    product;
  const { setWishList, userWishList, setUserWishList } = useWishList();
  const { token } = useAuth();
  const navigate = useNavigate();
  const { toastProps } = useDataStore();
  const { cartState, cartDispatch } = useCart();
  const { cartItems } = cartState;
  toast.configure();

  const temp = userWishList.find((item) => item._id === product._id);
  const addToWishList = async () => {
    if (!token) {
      navigate("/login");
    } else {
      try {
        const res = await axios.post("/api/user/wishlist", product, {
          headers: {
            authorization: token,
          },
        });
        setWishList([...res.data.wishlist]);
        temp
          ? [...userWishList]
          : setUserWishList([
              ...userWishList,
              { ...product, isWishList: true },
            ]);
      } catch (error) {
        console.log(error);
      }
      toast.success("Item added to wishlist", toastProps);
    }
  };

  const addToCartHandler = async () => {
    if (!token) {
      navigate("/login");
      return;
    } else {
      try {
        const res = await axios.post(
          "/api/user/cart",
          { ...product, qty: 1 },
          {
            headers: {
              authorization: token,
            },
          }
        );
        if (res.status === 200 || res.status === 201) {
          cartDispatch({
            type: "ADD_TO_CART",
            payload: res.data.cart,
            product,
          });
        }
        toast.success(`${title} added to cart`, toastProps);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="card">
      <div className="card-image-container">
        <img className="image-responsive" src={imgSrc} alt="book product" />
        <span className="card-icon favourites fs-lg">
          <FiHeart onClick={addToWishList} />
        </span>
        {temp && temp.isWishList ? (
          <span className="card-icon filled-favourites fs-lg">
            <FaHeart onClick={addToWishList} />
          </span>
        ) : (
          <span className="card-icon favourites fs-lg">
            <FiHeart onClick={addToWishList} />
          </span>
        )}
      </div>
      <div className="card-body flex-center">
        <p className="card-title center-text">{title}</p>
        <small className="not">{author}</small>
        <span className="rating high-rating mg-vrtl-sm">
          <span>{ratings}</span>
          <FaStar className="mg-l" />
        </span>
        <p className="card-sell-price center-text pd-hztl-sm">
          <span>₹{sellPrice}</span>
          <span className="card-cost-price">₹{costPrice}</span>
          <span className="card-discount">{discount}%off</span>
        </p>
        {cartItems.find((item) => item._id === product._id) ? (
          <Link className="wd-100" to="/cart">
            <button className="btn is-solid wd-100 is-cart">Go To Cart</button>
          </Link>
        ) : (
          <button
            onClick={addToCartHandler}
            className="btn is-solid wd-100 is-cart"
          >
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};
