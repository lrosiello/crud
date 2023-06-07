"use client"
import React from "react";
import {Header,Navbar, Nav } from 'rsuite';
import Navigation from "./Navigation";

export default function Head() {
  return (
    <Header>
    <Navbar appearance="inverse" style={{ backgroundColor: '#0a3542b3' ,boxShadow: '0 2px 4px rgba(0, 0, 0, 0.493)'}}>
      <Nav style={{ flex: 1 }}> 
        <Navigation />
      </Nav>
    </Navbar>
  </Header>
  );
}
