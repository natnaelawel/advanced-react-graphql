import React, { useEffect, useState } from "react";
import { gql, useApolloClient, useQuery } from "@apollo/client";

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      name
      email
      permissions
    }
  }
`;

function User({ children }) {
  const [userData, setUserData] = useState(null);
  const client = useApolloClient();
  useEffect(() => {
    const fetchUserData = async () => {
      const { data, loading, error } = await client.query({
        query: CURRENT_USER_QUERY,
        fetchPolicy: "cache-first"
      }, 
      );
      if (data) {
        setUserData(data);
      }
    };
    fetchUserData();
  }, [userData]);
  return <div>{userData && children(userData)}</div>;
}

export default User;
