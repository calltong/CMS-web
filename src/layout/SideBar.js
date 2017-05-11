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
    this.state = {
      active: '/Home',
    };
  }

  handleClick(title) {
    this.setState({active: title});
  }

  render() {
    let menus = [
      {title: 'Dashboard', icon: 'fa fa-fw fa-dashboard', route: '/home'},
      {title: 'Orders', icon: 'fa fa-fw fa-usd', route: '/orders'},
      {title: 'Products', icon: 'fa fa-fw fa-product-hunt', route: '/products'},
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
