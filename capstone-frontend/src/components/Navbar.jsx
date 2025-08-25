import React from 'react'
import { NavLink } from 'react-router';
import { useCartStore } from '../store/CartStore';

const Navbar = () => {
  const { items } = useCartStore();
  const totalPrice = items?.reduce((total, item) => total + item.price, 0);
  return (
    <nav className='navbar'>
      <h1>Header Goes Here</h1>
      <section className='nav-links-container'>
        <NavLink to="/" className='nav-link'>Home</NavLink>
        {/* You will have to adjust the NavLink element below this comment to create a real checkout page, starting with creating a new route in your project and then adjusting the `to` property */}
        <NavLink to="#" className='nav-link'>Checkout ${totalPrice}</NavLink>
        {/* Create New NavLink Elements in your project and place them below this comment */}

        {/* Create New NavLink Elements in your project and place them above this comment */}
      </section>
    </nav>
  )
}

export default Navbar