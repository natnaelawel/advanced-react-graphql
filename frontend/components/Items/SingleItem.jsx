import { gql, useApolloClient } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Head from "next/head";

export const GET_SINGLE_ITEM_QUERY = gql`
  query GET_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
      largeImage
    }
  }
`;

const SingleItemStyles = styled.div`
  max-width: 100%;
  height: 500px;
  box-shadow: ${(props) => props.theme.bs};
  display: grid;
  grid-template-columns: 2fr 1fr;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function SingleItem({ id }) {
  const [item, setItem] = useState(null);
  const [queryLoading, setQueryLoading] = useState();
  const [fetchError, setFetchError] = useState(null);
  // const id =
  const client = useApolloClient();

  const fetchData = async () => {
    const { data, loading, error } = await client.query({
      query: GET_SINGLE_ITEM_QUERY,
      variables: { id },
    });
    setFetchError(error);
    setQueryLoading(loading);
    if (data) {
      setItem(data.item);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SingleItemStyles>
      {queryLoading && <h1>Loading...</h1>}
      {fetchError && <Error error={fetchError} />}
      {item && (
        <>
          <Head>
            <title>sick fits | {}</title>
          </Head>
          <img src={item.largeImage} alt={item.title} />
          <div style={{ textAlign:'center' }}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        </>
      )}
    </SingleItemStyles>
  );
}

export default SingleItem;
