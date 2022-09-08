import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <header>
        <Link to="/cart" data-testid="shopping-cart-button">Shopping Cart</Link>
      </header>
    );
  }
}

export default Header;
