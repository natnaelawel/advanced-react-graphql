import React, { useEffect, useState } from "react";
import { useQuery, gql, useApolloClient } from "@apollo/client";
import Head from 'next/head';
import Link from 'next/link';

import PaginationStyles from "./styles/PaginationStyles";
import { perPage } from "../config";

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      aggregate {
        count
      }
      edges {
        node {
          title
        }
        cursor
      }
    }
  }
`;

function Pagination({page}) {
  const [totalPage, setTotalPage] = useState(0);
  // const {data, loading, error} = useQuery(PAGINATION_QUERY);
  // if(data){
  //     setTotalPage(data.itemsConnection.aggregate.count)
  //     // setTotalPage(data.data.itemsConnection.aggregate.count);
  // }

  const client = useApolloClient();
  const fetchData = async () => {
    const { data, loading, error } = await client.query({
      query: PAGINATION_QUERY,
    });
    if (data) {
      setTotalPage(data.itemsConnection.aggregate.count);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <PaginationStyles>
      <div>
        <Head>
          <title>
            Sick Fits | Page {page} of {Math.ceil(totalPage / perPage)}
          </title>
        </Head>
        <Link prefetch href={{ pathname: "items", query: { page: page - 1 } }}>
          <a className="prev" aria-disabled={page <= 1}>
            {"<-Prev "}
          </a>
        </Link>{" "}
        Page {page} of {Math.ceil(totalPage / perPage)}{" "}
        <Link className="next" prefetch href={{ pathname: "items", query: { page: page + 1 } }}>
          <a aria-disabled={page >= Math.ceil(totalPage/ perPage)}>{"Next-> "}</a>
        </Link>
      </div>
    </PaginationStyles>
  );
}

export default Pagination;
