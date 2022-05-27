import React from 'react'
import { getSession,useSession } from "next-auth/react";

function products() {
  const { data, status} = useSession()
  console.log(data)
  console.log(status)
  const handleFetch = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/hello')
      .then(res => res.json())
      .then(data => console.log(data))
  }
  return (
    <div>
      <button onClick={handleFetch}>fetch</button>
    </div>
  )
}

export default products

export async function getServerSideProps(ctx){
    // const session = await getSession(ctx);
    // const { accessToken } = session;
    // console.log(accessToken)
    return {
        props: {
          
        },
    };
}