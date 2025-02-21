import Image from "next/image";
import { useEffect, useState } from "react";

export default async function Home() {
  
      let result = await fetch("http://127.0.0.1:5328");
      const t = await result.text()


  return (
    <div className="text-white">
      {JSON.stringify(t)}
    </div>
  );
}
