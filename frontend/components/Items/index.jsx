import React from "react";
// import { Query } from "react-apollo";
// import gql from "graphql-tag";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Item from "./Item";
import Pagination from "../Pagination";
import { perPage } from "../../config";

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int=0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: title_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
  /* background-color: lightblue; */
`;

const ItemList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
`;


function index(props) {
  const { loading, error, data } = useQuery(ALL_ITEMS_QUERY,{variables: {skip: props.page* perPage - perPage, first: perPage}});

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Center>
      <Pagination page={props.page} />
      <ItemList>
        {data.items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ItemList>
      <Pagination page={props.page} />
    </Center>
  );
}

export default index;

// export default class Items extends Component {
//     render() {
//         return (
//             <Center>
//                 <p>Items!</p>
//                 <Query query={ALL_ITEMS_QUERY}>
//                     {({data, error, loading})=>{
//                         if(loading){
//                             return (<p>Loading...</p>)
//                         }
//                         if(error){
//                         return (<p>Error {error.message}</p>)
//                         }
//                         console.log(data.items)
//                         return (
//                             <ItemList>
//                                 {data.items.map((item)=>(
//                                     <Item item={item} key={item.id}/>
//                                 ))}
//                             </ItemList>
//                         )
//                     }
//                     }
//                 </Query>
//             </Center>
//         )
//     }
// }
