import React from "react";
import { Monster } from "../../App";
import "./card.styles.css";

type CartProps = {
  monster: Monster;
};

const Card = (props: CartProps) => {
  const { id, name, email } = props.monster;

  return (
    <div className="card-container">
      <img
        src={`https://robohash.org/${id}?set=set2&size=180x180`}
        alt={`monster ${name}`}
      />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
};

export default Card;
