import React, { FC } from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

const Navbar: FC = () => {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img
            src='/assets/logo.png'
            alt='logo'
            style={{ marginRight: '10px' }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name='Activities' />
        <Menu.Item>
          <Button positive content='Create Activity'></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
