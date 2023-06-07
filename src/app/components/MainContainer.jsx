import React from 'react';
import { Container, Header, Content, Footer, Navbar, Nav } from 'rsuite';
import Navigation from './Navigation';

export default function MainContainer({ page }) {
  return (
    <div className="show-fake-browser navbar-page">
  
      <div style={{ width: '90vw', maxWidth: '850px', marginLeft: 'auto', marginRight: 'auto' }}>
        <Container style={{ marginTop: '20px', border: 'solid' }}>
          <Content>{page}</Content>
      
        </Container>
      </div>
    </div>
  );
}
