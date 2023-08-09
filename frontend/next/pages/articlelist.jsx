import React, { useState } from "react";
import Nav from "../components/Nav";
import Link from "next/link";

export default function ArticleList() {

  return (
    <>
      <Nav />
      <div style={{'marginTop': '5rem'}}>articlelist</div>
      <Link href={'/createarticle'}>
        <a>
          <button>create</button>
        </a>
    </Link>
    </>
  );
}

