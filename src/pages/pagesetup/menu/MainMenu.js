import React from 'react';

import EnButton from '../../../forms/EnButton';
import {actions} from '../../../actions/Action';

export default class MainContent extends React.Component {
  onChange(index) {
    actions.page.selectPageMenu(index);
  }

  render() {
    let list = this.props.list;
    let menus = list.map((item, index) => {
      return (
        <div key={index}>
          <EnButton
            className="btn btn-pmenu btn-pmenu-full"
            onClick={this.onChange.bind(this, index)} >
             {item.name}
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
