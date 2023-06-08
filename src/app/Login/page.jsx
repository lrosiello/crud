"use client"
import React from "react";
import MainContainer from "../components/MainContainer";
import { IconButton ,AddIcon} from "rsuite";

export default function LoginPage() {

  const login = (
    <div>
      <h1>Login</h1>
      <p>Este es el contenido de la página Login</p>
    </div>
  );


  return (
    <>
  
      <MainContainer page={login} />
    </>
    
   
  );
}
