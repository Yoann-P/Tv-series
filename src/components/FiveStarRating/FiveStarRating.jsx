import s from "./style.module.css";
import { StarFill, Star as StarEmpty, StarHalf } from "react-bootstrap-icons";

export function FiveStarRating({ rating }) {
  // Déclarer un tableau d'étoiles vides
  const starList = [];

  // Stocker dans une variable le nombre d'étoiles pleines
  const starFillCount = Math.floor(rating);

  // Stocker dans une variable si oui ou non il y a une demi étoile
  const hasStarHalf = rating - starFillCount >= 0.5;

  // Stocker dans une varialble le nombre d'étoile vides
  const emptyStarCount = 5 - starFillCount - (hasStarHalf ? 1 : 0);
  //   console.log(starFillCount, hasStarHalf, emptyStarCount);

  // push dans le tableau le nombre d'étoiles pleine
  for (let i = 1; i <= starFillCount; i++) {
    starList.push(<StarFill key={"star-fill" + i} />);
  }
  // pusher dans le tableau s'il y a des demi étoile
  if (hasStarHalf) {
    starList.push(<StarHalf key={"star-half"} />);
  }
  // pusher dans le tableau le nombre d'étoiles vides
  for (let i = 1; i <= emptyStarCount; i++) {
    starList.push(<StarEmpty key={"star-empty" + i} />);
  }

  return <div>{starList}</div>;
}
