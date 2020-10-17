import { gql, useMutation } from "@apollo/client";
import React from "react";
import { ALL_ITEMS_QUERY } from "./index";

export const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

function DeleteButton({ id, children, handleOnDeleted }) {
  const [deleteItem, { loading, error }] = useMutation(DELETE_ITEM_MUTATION);
  const handleUpdate = (cache, payload) => {
    // const data = cache.readQuery({query: ALL_ITEMS_QUERY})
    // console.log('cache data is ', data, payload)
    // data.items = data.items.filter(item=> item.id !== payload.data.deleteItem.id)

    // cache.writeQuery({query: ALL_ITEMS_QUERY, data})

    cache.modify({
      fields: {
        items() {
          return data.items.filter(item=> item.id !== payload.data.deleteItem.id)
      },}
    });
  };
  const handleDelete = async () => {
    if (confirm("Are you sure you want ot delete the item")) {
      const data = await deleteItem({
        variables: { id },
        update: handleUpdate,
      });
      if (data) {
        console.log("success", data);
        // handleOnDeleted(id)
        // handleUpdate()
      }
    }
  };
  return (
    <button
      style={{ backgroundColor: "red" }}
      disabled={loading}
      onClick={handleDelete}
    >
      {children}
    </button>
  );
}

export default DeleteButton;
