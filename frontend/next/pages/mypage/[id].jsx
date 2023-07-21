import React from "react";
import { useRouter } from "next/router";
import Nav from "../../components/Nav";

export default function Page() {
  const router = useRouter();
  // console.log(router);

  return (
    <>
      <Nav />
      <h1>pcy detail id</h1>
      <p>{router.query.id} </p>
    </>
  );
}
