import { Head } from "next/head";
import React from "react";
import SingleItem from "../../components/Items/SingleItem";

function index(props){
  return (
    <div>
      <SingleItem id={props.query.id} />
      {/* {JSON.stringify(props)} */}
      {/* <Item item={item}/> */}
    </div>
  );
};

export default index;

