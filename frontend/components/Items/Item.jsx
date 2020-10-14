import React from "react";
import Title from "../styles/Title";
import ItemStyles from "../styles/ItemStyles";
import PriceTag from "../styles/PriceTag";
import Link from 'next/link'

import formatMany from '../../lib/formatMoney'

function Item({ item }) {
  return (
    <ItemStyles>
        {item.image && (<img width={100} height={100} src={item.image} alt={item.title} />)}
      <Title>
        <Link href={{ pathname: "/item", query: { id: item.id } }}>
          {item.title}
        </Link>
      </Title>
      <PriceTag>{formatMany(item.price)}</PriceTag>
      <p>{item.description}</p>
      <div className="buttonList">
        <Link href={{ pathname: "update", query: { id: item.id } }}>✏</Link>
        <Link href={{ pathname: "update", query: { id: item.id } }}>
          <span style={{ fontSize: 30 }}>🖊</span>
        </Link>
        <Link href={{ pathname: "update", query: { id: item.id } }}>
          Add to cart
        </Link>
        <button>
          Delete
        </button>
      </div>
    </ItemStyles>
  );
}

export default Item;
