import React from 'react';

import EnButton from '../../../forms/button/EnButton';
import {actions} from '../../../actions/Action';

export default class MainContent extends React.Component {
  onChange(index) {
    actions.page.selectMenu(index);
  }

  render() {
    let list = this.props.list;
    let menus = list.map((item, index) => {
      return (
        <div key={index}>
          <EnButton
            className="btn btn-pmenu btn-pmenu-full"
            onClick={this.onChange.bind(this, item.name)} >
             {item.title}
          </EnButton>
        </div>
      );
    });
    return (
      <div>
        {menus}
      </div>
    );
  }
}
