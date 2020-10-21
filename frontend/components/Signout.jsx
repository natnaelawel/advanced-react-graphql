import React from "react";
import {gql, useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";
import Router from "next/router";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

function Signout() {
  const [signout, { loading, error }] = useMutation(SIGN_OUT_MUTATION, {refetchQueries:[{query: CURRENT_USER_QUERY}], awaitRefetchQueries: true});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signout();
    if(res){
      Router.push({pathname: "/signup"})
    }
  };
  return <button onClick={handleSubmit}>Sign Out</button>;
}

export default Signout;
