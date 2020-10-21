import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";
import Router from "next/router";
export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {refetchQueries:[{query: CURRENT_USER_QUERY}]});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup({ variables: { name, email, password } });
    if (res) {
      setName("");
      setEmail("");
      setPassword("");
      Router.push({
        pathname: "/",
      });
    }
  };

  return (
    <div>
      <Form method="post" onSubmit={handleSubmit}>
        <fieldset disabled={loading} aria-busy={loading}>
          <h2>Sign Up for An Account</h2>
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
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

          <button type="submit">Sign Up!</button>
        </fieldset>
      </Form>
    </div>
  );
}

export default Signup;
