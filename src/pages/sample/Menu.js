import React from 'react';
import {Link} from 'react-router';

export class Menu extends React.Component {
  render() {
    let menu = this.props.content;
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

    let cssBag = {
      color: 'black',
      backgroundColor: 'white',
    };

    let cssMobileMenu = {
      border: `1px solid ${menu.css.color}`,
      backgroundColor: menu.css.bg_color,
    };

    let cssMobileItem = {
      backgroundColor: menu.css.color,
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
        <div className="container" >
          <div className="menu-header">
            <button
              type="button"
              style={cssMobileMenu}
              className="navbar-toggle" >
              <span className="sr-only">Menu</span>
              <span style={cssMobileItem} className="icon-bar"/>
              <span style={cssMobileItem} className="icon-bar"/>
              <span style={cssMobileItem} className="icon-bar"/>
            </button>
            <Link to="/home" className="navbar-brand" style={cssBrand}>{menu.brand.name}</Link>
          </div>

          <div className="collapse navbar-collapse" id="header-bar">
            <ul className="nav navbar-nav">
              {list}
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <a
                  style={css}
                  className="menu-bag">
                  <i className="fa fa-shopping-bag" />
                  <span style={cssBag} className="menu-bag-number">{4}</span>
                </a>
              </li>

              <li>
                <a
                  style={css}
                  className="menu-help">
                  <i className="fa fa-question-circle-o"/>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Menu;
