"use client"
import React from "react";
import MainContainer from "./components/MainContainer";



export default function Home() {

  const home = (
    <div>
      <h1>Home Page</h1>
      <p>Este es el contenido de la página Home</p>
    </div>
  );

  return (
    
      <MainContainer page={home} />
   
  );
}
