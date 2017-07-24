import React from 'react';
import Select from 'react-select';

import EnText from '../../../../forms/EnText';

import {actions} from '../../../../actions/Action';
import {store} from '../../../../store';

export default class ItemProperty extends React.Component {
  nameChange(event) {
    let index = this.props.index;
    let menu = this.menu.list[index];
    menu.name = event.target.value;
    actions.page.setMenuItem(index, menu);
  }

  typeChange(value) {
    let index = this.props.index;
    let menu = this.menu.list[index];
    menu.type = value.value;
    actions.page.setMenuItem(index, menu);
  }

  categoryChange(event) {
    let index = this.props.index;
    let menu = this.menu.list[index];
    menu.category = event === null ? '' : event.value;

    actions.page.setMenuItem(index, menu);
  }

  tagChange(event) {
    let index = this.props.index;
    let menu = this.menu.list[index];
    menu.tag = event.target.value;
    actions.page.setMenuItem(index, menu);
  }

  render() {
    let options = [
      {value: 'category', label: 'Category'},
      {value: 'tag', label: 'Tag'},
    ];

    this.menu = this.props.menu;
    let item = this.menu.list[this.props.index];

    let type_list = store.getState().product.type_list;

    let types = type_list.map(type => {
      return {value: type._id, label: type.name, clearableValue: false};
    });

    let valButton = <div />;
    if (item.type === 'category') {
      valButton = (<Select
        clearable={true}
        searchable={false}
        value={item.category}
        options={types}
        onChange={this.categoryChange.bind(this)} />);
    } else {
      valButton = (<EnText
        placeholder="Enter value..."
        value={item.tag || ''}
        onChange={this.tagChange.bind(this)} />);
    }

    return (
      <div>
        <div className="form-group">
          <label>ชื่อเมนู</label>
          <EnText
            value={item.name}
            onChange={this.nameChange.bind(this)}
            placeholder="ชื่อเมนู.." />
        </div>

        <div className="form-group">
          <label>ประเภท</label>
          <Select
            clearable={false}
            searchable={false}
            value={item.type}
            options={options}
            onChange={this.typeChange.bind(this)} />
        </div>

        <div className="form-group">
          <label>Value</label>
          {valButton}
        </div>
      </div>
    );
  }
}
