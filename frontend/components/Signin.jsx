import React, { useState } from "react";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
// import { CURRENT_USER_QUERY } from "./User";
import { gql, useMutation } from "@apollo/client";
import Router from "next/router";
import { CURRENT_USER_QUERY } from "./User";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

function Signin() {
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signin, { loading, error }] = useMutation(SIGNIN_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signin({ variables: { email, password } });
    if (res) {
      // Router.push('/')
      // setUserData(res.data)
      Router.push({
        pathname: "/",
      });
    }
  };

  // const client = useApolloClient();
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const { data, loading, error } = await client.query({
  //       query: SIGNIN_MUTATION,
  //     });
  //     if (data) {
  //       setUserData(data);
  //     }
  //   };
  //   fetchUserData();
  // }, [userData]);
  return (
    <div>
      <Form method="post" onSubmit={handleSubmit}>
        <fieldset disabled={loading} aria-busy={loading}>
          <h2>Sign into your account</h2>
          <Error error={error} />
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit">Sign In!</button>
        </fieldset>
      </Form>
    </div>
  );
}

export default Signin;
