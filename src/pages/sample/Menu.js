import React from 'react';
import {Link} from 'react-router';

export class Menu extends React.Component {

  render() {
    let menu = this.props.menu;
    let css = {
      color: menu.css.color,
      backgroundColor: menu.css.bg_color,
      fontFamily: menu.css.font,
      fontSize: menu.css.size,
    };

    let cssBrand = {
      color: menu.brand.css.color,
      fontFamily: menu.brand.css.font,
      fontSize: menu.brand.css.size,
    };

    let list = menu.list.map((item, index) => {
      return (
        <li key={index}>
          <a style={css}>
            {item.name}
          </a>
        </li>
      );
    });


    return (
      <nav style={css} className="navbar" role="navigation">
        <div className="container">
          <div className="menu-header">
            <button type="button" className="navbar-toggle" style={css}>
              <span className="sr-only">Menu</span>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
            </button>
            <Link className="navbar-brand" style={cssBrand}>{menu.brand.name}</Link>
          </div>

          <div className="collapse navbar-collapse" id="header-bar">
            <ul className="nav navbar-nav">
              {list}
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <a style={css}><i className="fa fa-shopping-bag"> {10}</i></a>
              </li>

              <li>
                <a style={css}><i className="fa fa-question-circle-o"> Help</i></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Menu;
