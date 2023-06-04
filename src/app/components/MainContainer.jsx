import React from 'react';
import { Container, Header, Content, Footer, Navbar, Nav } from 'rsuite';


import Navigation from './Navigation';

export default function MainContainer({ page }) {
  return (
    <div className="show-fake-browser navbar-page">
      <Header>
        <Navbar appearance="inverse" style={{ backgroundColor: '#0a3542b3' ,boxShadow: '0 2px 4px rgba(0, 0, 0, 0.493)'}}>
          <Nav > 
            <Navigation />
          </Nav>
        </Navbar>
      </Header>
      <div style={{ width: '90vw', maxWidth: '850px' }}>
        <Container style={{ marginTop: '20px', border: 'solid' }}>
          <Content>{page}</Content>
          <Footer>Footer</Footer>
        </Container>
      </div>
    </div>
  );
}
