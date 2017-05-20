import React, { Component } from 'react';
import { Link } from 'react-router';

class SingleMenu extends React.Component {
  render() {
    let icon = (this.props.icon) ? `icon ${this.props.icon}`: '';
    return (
      <li className={(this.props.active) ? 'active' : ''}>
        <Link to={this.props.route || '#'} target={this.props.target} onClick={this.props.onClick}>
          <i className={icon}/>
          <span className="title"> {this.props.title}</span>
        </Link>
      </li>
    );
  }
}

class MultiMenu extends React.Component {
  render() {
    let menuItems = this.props.menus.map(item => {
      return (
        <SingleMenu key={item.title}
          title={item.title}
          icon={item.icon}
          route={item.route}
          active={item.title === this.props.active}
          onClick={this.props.onClick.bind(this, item.title)}
        />
      );
    });
    return (
      <li className="active">
        <a href="javascript:;" data-toggle="collapse" data-target="#demo">
          <i className="fa fa-fw fa-arrows-v"/> {this.props.title}
          <i className="fa fa-fw fa-caret-down"/>
        </a>
        <ul id="demo" className="collapse in">
          {menuItems}
        </ul>
      </li>
    );
  }
}

export class SideBar extends Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
    this.state = {active: '/Home'};
=======
    this.state = {
      active: '/Home',
    };
>>>>>>> f5522238d95fa47c0193dbc232e0d1bba145893e
  }

  handleClick(title) {
    this.setState({active: title});
  }

  render() {
    let menus = [
      {title: 'Dashboard', icon: 'fa fa-fw fa-dashboard', route: '/Home'},
      {title: 'Order', icon: 'fa fa-fw fa-usd', route: '/OrderManager'},
      {title: 'Product Manager', icon: 'fa fa-fw fa-product-hunt', route: '/ProductManager'},
      {title: 'Product Setting',
        menus: [
          {title: 'Create Product', icon: 'fa fa-fw fa-product-hunt', route: '/ProductManager/Create'},
          {title: 'Type Manager', icon: 'fa fa-fw fa-product-hunt', route: '/TypeManager'},
          {title: 'Size Manager', icon: 'fa fa-fw fa-product-hunt', route: '/SizeManager'},
          {title: 'Color Manager', icon: 'fa fa-fw fa-product-hunt', route: '/ColorManager'},
        ]},
      {title: 'Page Manager', icon: 'fa fa-fw fa-dashboard', route: '/PageManager'},
    ];
    let menuItems = menus.map(item => {
      if (item.menus) {
        return (
          <MultiMenu key={item.title}
            title={item.title}
            icon={item.icon}
            menus={item.menus}
            active={this.state.active}
            onClick={this.handleClick.bind(this, item.title)}
          />
        );
      } else {
        return (
          <SingleMenu key={item.title}
            title={item.title}
            icon={item.icon}
            route={item.route}
            active={item.title === this.state.active}
            onClick={this.handleClick.bind(this, item.title)}
          />
        );
      }
    });

    return (
      <div className="collapse navbar-collapse navbar-ex1-collapse">
        <ul className="nav navbar-nav side-nav">
          {menuItems}
        </ul>
      </div>
    );
  }
}

export default SideBar;
