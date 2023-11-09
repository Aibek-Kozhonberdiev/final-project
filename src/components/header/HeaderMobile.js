import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';



class HeaderMobile extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {

    return (
      <div id="outer-container">
      <Menu className={ "header__nav-mobile" } width={'80%'} >
        <NavLink to='/quizzes' className='header__link'>
          Все квизы
        </NavLink>
        <NavLink to='/rooms' className='header__link'>
            Комнаты
        </NavLink>


        {/* <NavLink to='/cart' className='header__link'>
            <Button text={'Start'} className={'header__cart-btn'} />
          </NavLink> */}
      </Menu>
      </div>
    );
  }
}
export default HeaderMobile;