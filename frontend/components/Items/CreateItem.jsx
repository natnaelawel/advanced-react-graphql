import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Router from "next/router";
// import { Mutation } from "react-apollo";
// import gql from "graphql-tag";

import Form from "../styles/Form";
import formatMany from "../../lib/formatMoney";
import Error from "../ErrorMessage";
// import cloudinary from 'cloudinary'

// export const CREATE_ITEM_MUTATION = gql`
//   mutation CREATE_ITEM_MUTATION(
//     $title: String!
//     $description: String
//     $price: Int!
//     $image: String
//     $largeImage: String
//   ) {
//     createItem(
//       titile: $title
//       description: $description
//       price: $price
//       image: $image
//       largeimage: $largeImage
//     )
//   }
//   {
//     id
//   }
// `;
export const CREATE_ITEM_MUTATION = gql`
  mutation addItem(
    $title: String!
    $description: String
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

const CreateItem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [largeImage, setLargeImage] = useState("");
  const [price, setPrice] = useState(0);
  const [photoUploadDone, setPhotoUploadDone] = useState(false)

  const [
    addItem,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_ITEM_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // handleImageUpload()
    if(photoUploadDone){

      const res = await addItem({ variables: { title, description, image, largeImage, price } });
      Router.push({
        pathname: '/item',
        query: {id: res.data.createItem.id}
      })
    }
    // console.log(data);
    // console.log(title, description, image, largeImage, price);
  };
  const handleImageUpload = async(imageData)=>{
    //  cloudinary.config({ 
    //     cloud_name: "dfkz0zqg8",
    //     api_key: "341962684142321",
    //     api_secret: "cOTdnNfgbTgBCx3k9dq2xhhLvws"
    // })
    //    let promise = await  cloudinary.v2.uploader.unsigned_upload(image, "sickfits", options);
    //  let promise = await cloudinary.v2.uploader.upload(dataUrl, {
    //   public_id: `${day}/sample-${timeStamp}`,
    //   tags: "react-firebase" // tag
    // })

  const data = new FormData()
  data.append('file', imageData)
  data.append('upload_preset', 'sickfits')

    const res = await fetch('https://api.cloudinary.com/v1_1/dfkz0zqg8/image/upload', {
      method: 'Post', 
      body: data
    })
    try {
      const file = await res.json();
      console.log(file)
      setImage(file.secure_url)
      setLargeImage(file.eager[0].secure_url)
      setPhotoUploadDone(true)
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {mutationLoading && <p>Loading...</p>}
      <Error error={mutationError} />
      <fieldset disabled={mutationLoading} aria-busy={mutationLoading}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
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
        {
          image && (
            <img src={image} alt="preview" style={{ height: "100px" }} width={100} height={100}/>
          )
        }
      </fieldset>
      <button type="submit">Submit</button>
    </Form>
  );
};

export default CreateItem;
