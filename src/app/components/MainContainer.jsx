import * as React from 'react';
import { Container, Header, Content, Footer, Navbar, Nav } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';

import Navigation from './Navigation';
import Tables from './Tables';

export default function MainContainer({ page }) {
  return (
    <div className="show-fake-browser navbar-page">
      <Header>
        <Navbar appearance="inverse"  style={{ backgroundColor: '#0a3542' }} >
          <Nav>
            <Navigation/>
          </Nav>
        </Navbar>
      </Header>
      <div style={{ width: '90vw', maxWidth: '850px' }}>
        <Container>
          <Content>{page}</Content>
          <Footer>Footer</Footer>
        </Container>
      </div>
    </div>
  );
}
