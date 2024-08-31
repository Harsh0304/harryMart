import "./Home.css";
import bg from "../../assests/bg.png";
const Hero = () => {
  return (
    <div className="hero">
      <div className="container">
        <div className="hero__container">
          <div className="hero__info">
            <h1 className="hero__heading">
              Discover and <br /> find your <br /> own fation.
            </h1>
            <p className="hero__dec">
              Explore our wide selection of products,
              <br /> from electronics and gadgets to fashion,
              <br /> home decor, and everything in between.
            </p>
            <button className="btn btn__shop">Shop Now</button>
          </div>
          <div className="hero__img">
            <img src={bg} alt="hero" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
