import keep from "../../../assets/images/keep.jpg";
import hands from "../../../assets/images/hands.png";
import mask from "../../../assets/images/mask.png";
import "../../../assets/css/prevention.css";

export const List = () => {
  const l = [
    { img: keep, label: "Avoid close contact" },
    { img: hands, label: "Clean your hands often" },
    { img: mask, label: "Wear a facemask" },
  ];

  return (
    
        /*Dynamic*/
    <div className="prevention-list">
      {l.map((item, index) => (
        <div className="home-prevention-1" key={index}>
          <img src={item.img} alt={item.label} />
          <div>{item.label}</div>
        </div>
      ))}
    </div>
  );
};