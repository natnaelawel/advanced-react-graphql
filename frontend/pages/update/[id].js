import React from 'react'
// import UpdateItem from '../../components/Items/UpdateItem'
import { useRouter } from 'next/router'

function index() {
    const router = useRouter()
    const { id } = router.query

    return (
        <div>
            {id}
            {/* <UpdateItem/> */}
        </div>
    )
}

export default index
