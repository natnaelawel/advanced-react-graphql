import React from "react";
import Link from "next/link";

import NavStyles from "./styles/NavStyles";
import User from "./User";
import Signout from "./Signout";

function Nav() {
  return (
    <User>
      {({ me }) => (
        <NavStyles>
          <Link href="/items">
            <a>Shop</a>
          </Link>
          {me && (
            <>
              <Link href="/sell">
                <a>Sell</a>
              </Link>
              <Link href="/orders">
                <a>Orders</a>
              </Link>
              <Link href="/myaccount">
                <a>Account</a>
              </Link>
              <Link href="/account">
                <a>{me.name}</a>
              </Link>
              <Signout/>
            </>
          )}
          {!me && (
            <>
              <Link href="/signup">
                <a>Sign In</a>
              </Link>
              <Link href="/signup">
                <a>Sign Up</a>
              </Link>
            </>
          )}
        </NavStyles>
      )}
    </User>
  );
}

export default Nav;
