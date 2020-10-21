import React, { useState } from "react";
import { Mutation } from "react-apollo";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { gql, useMutation } from "@apollo/client";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

function RequestReset() {
  const [email, setEmail] = useState("");
  const [reset, { loading, error }] = useMutation(REQUEST_RESET_MUTATION);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await reset({variables:{email}});
  };
  return (
    <div>
      <Form method="post" data-test="form" onSubmit={handleSubmit}>
        <fieldset disabled={loading} aria-busy={loading}>
          <h2>Request a password reset</h2>
          <Error error={error} />
          {!error && !loading && (
            <p>Success! Check your email for a reset link!</p>
          )}
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={e=> setEmail(e.target.value)}
            />
          </label>

          <button type="submit">Request Reset!</button>
        </fieldset>
      </Form>
    </div>
  );
}

export default RequestReset;
export { REQUEST_RESET_MUTATION };
