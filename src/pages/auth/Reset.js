import { Link } from "react-router-dom";
import "./Auth.css";
import ResetImg from "../../assests/6.jpg";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useState } from "react";
import { toast } from "react-toastify";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("a link is sent to your account");
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__img">
          <img src={ResetImg} alt="logimg" />
        </div>
        <div className="login__info">
          <h2>Login</h2>
          <form className="form__container" onSubmit={handleReset}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="btn btn__auth" type="submit">
              Reset
            </button>
            <div className="reset">
              <Link to="/login" className="forgot__password">
                -Login
              </Link>
              <Link to="/register" className="forgot__password">
                -Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
