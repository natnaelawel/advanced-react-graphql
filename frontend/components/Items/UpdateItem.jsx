import React, { useState, useEffect } from "react";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import Router from "next/router";
import Form from "../styles/Form";
import formatMany from "../../lib/formatMoney";
import Error from "../ErrorMessage";

export const UPDATE_ITEM_MUTATION = gql`
  mutation updateItem(
    $id: ID!
    $title: String!
    $description: String
    $price: Int!
    $image: String
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
      image: $image
    ) {
      id
    }
  }
`;
export const GET_ITEM_QUERY = gql`
  query GET_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UpdateItem = ({ id }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [largeImage, setLargeImage] = useState("");
  const [price, setPrice] = useState(0);
  const [photoUploadDone, setPhotoUploadDone] = useState(false);
  const [queryError, setQueryError] = useState("")

  const client = useApolloClient();
  const [loading, setLoading] = useState(false);

  const [
    updateItem,
  { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_ITEM_MUTATION);

  useEffect(() => {
    const runQuery = async () => {
      setLoading(true);
      //  const { loading, error, data } = useQuery(GET_ITEM_QUERY , {variables: {id}});
      const { loading, error, data } = await client.query({
        query: GET_ITEM_QUERY,
        variables: { id },
      });
      if (data) {
        console.log(data);
        setTitle(data.item.title);
        setDescription(data.item.description);
        setPrice(data.item.price);
      }else{
        setQueryError(error)
      }
      setLoading(false);
    };
    runQuery();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (photoUploadDone) {
      setLoading(true);
      const res = await updateItem({ variables: { id, title, description, image, price }, });
      console.log(res.data);
      Router.push("/items");
      // Router.push({
      //   pathname: "/item",
      //   query: { id: res.data.id },
      // });
      setLoading(false);
    }
  };
  const handleImageUpload = async (imageData) => {
    const data = new FormData();
    data.append("file", imageData);
    data.append("upload_preset", "sickfits");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dfkz0zqg8/image/upload",
      {
        method: "Post",
        body: data,
      }
    );
    try {
      const file = await res.json();
      console.log(file);
      setImage(file.secure_url);
      setLargeImage(file.eager[0].secure_url);
      setPhotoUploadDone(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {loading && <p>Loading...</p>}
      <Error error={mutationError} />
      {
        queryError &&  (<Error error={queryError}/>)
      } 
      <fieldset disabled={loading} aria-busy={mutationLoading}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            defaultValue={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="description"
            required
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            required
            defaultValue={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label htmlFor="image">
          Image
          <input
            type="file"
            name="image"
            id="image"
            placeholder="image"
            required
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
        </label>
        {image && (
          <img
            src={image}
            alt="preview"
            style={{ height: "200px" }}
            width={200}
            height={200}
          />
        )}
      </fieldset>
      <button type="submit" disabled={mutationLoading}>Sav{mutationLoading ? 'ing': 'e'} Changes</button>
    </Form>
  );
};

export default UpdateItem;
