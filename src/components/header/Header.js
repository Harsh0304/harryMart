import { Link, useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import "./Header.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
  selectEmail,
  selectIsLoggedIn,
  selectIsUserName,
} from "../../redux/slice/authSlice";
const Header = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const email = useSelector(selectEmail);
  const userName = useSelector(selectIsUserName);

  const handleLogout = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setIsLoading(false);
        toast.success("User logged out");
        navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          const name = user.email.substring(0, user.email.indexOf("@"));
          const uName = name.charAt(0).toUpperCase() + name.slice(1);
          setNewUser(uName);
        } else {
          setNewUser(user.displayName);
        }
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : newUser,
            userId: user.uid,
          })
        );
      } else {
        setNewUser("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, newUser]);

  return (
    <>
      {isLoading && <Loader />}
      <header>
        <div className="container header__container">
          <div className="header">
            <div className="logo">
              <Link to="/">
                Harry<span>Mart</span>
              </Link>
            </div>

            <div className="nav__links">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link>Shop</Link>
                </li>
                <li>
                  <Link>Admin</Link>
                </li>
              </ul>
            </div>
            <div className="cart">
              <Link className="cart__btn">
                <FaCartPlus />
              </Link>
              {isLoggedIn && (
                <Link to="/register" className="register">
                  <FaUser /> {userName}
                </Link>
              )}
              <Link to="/register" className="register">
                Register
              </Link>
              {!isLoggedIn && (
                <Link to="/login" className="btn btn__login">
                  Login
                </Link>
              )}
              {isLoggedIn && (
                <Link
                  to="/login"
                  className="btn btn__login"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
