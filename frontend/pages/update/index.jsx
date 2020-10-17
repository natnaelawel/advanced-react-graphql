import React from 'react'
import UpdateItem from '../../components/Items/UpdateItem'

function index(props) {
    return (
      <div>
        {/* {props.query.id} */}
        <UpdateItem id={props.query.id} />
      </div>
    );
}

export default index
