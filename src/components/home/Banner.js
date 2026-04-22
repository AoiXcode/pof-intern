import Gojo from "../../assets/images/Gojo.png";
export const Banner = () => {
  return (
    <div className="banner">
      <img
        src={Gojo}
        alt="banner"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};