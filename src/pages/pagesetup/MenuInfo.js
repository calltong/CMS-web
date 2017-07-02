import React from 'react';
import Select from 'react-select';

import EnText from '../../forms/EnText';
import AddButton from '../../forms/AddButton';
import RemoveButton from '../../forms/RemoveButton';

import {store} from '../../store';
import {actions} from '../../actions/Action';

export default class MenuInfo extends React.Component {

  nameChange(index, event) {

  }

  buttonTypeChange(index, value) {
    console.log(index, ':type:', value);
    let menu = this.data.menu.list[index];
    menu.type = value.value;
    actions.page.setMenu(index, menu);
  }

  valueChange(index, type, event) {
    console.log(index, ':type:', type, ' val:', event);
    let menu = this.data.menu.list[index];
    if (type === 'category') {
      menu.value = event === null ? '': event.value;
    } else {
      menu.value = event.target.value;
    }
    actions.page.setMenu(index, menu);
  }

  onRemove(index) {

  }

  onAdd() {

  }

  render() {
    let type_list = store.getState().product.type_list;
    let data = this.props.data;
    this.data = data;

    let types = type_list.map(item => {
      return {value: item._id, label: item.name, clearableValue: false};
    });
    let options = [
      {value: 'category', label: 'Category'},
      {value: 'tag', label: 'Tag'},
      {value: 'sale', label: 'Sale Price'},
    ];

    let list = data.menu.list.map((item, index) => {
      let valButton = '';
      if (item.type === 'category') {
        valButton = (<Select
          clearable={true}
          searchable={false}
          value={item.value}
          options={types}
          onChange={this.valueChange.bind(this, index, item.type)} />);
      } else {
        valButton = (<EnText
          placeholder="Enter value..."
          value={item.value || ''}
          onChange={this.valueChange.bind(this, index)} />);
      }
      return (
        <div className="row" key={index} style={{marginTop:'5px'}}>
          <div className="col-md-2">
            <EnText
              placeholder="Enter name..."
              value={item.name || ''}
              onChange={this.nameChange.bind(this, index)} />
          </div>

          <div className="col-md-2">
            <Select
              clearable={false}
              searchable={false}
              value={item.type}
              options={options}
              onChange={this.buttonTypeChange.bind(this, index)} />
          </div>

          <div className="col-md-3">
            {valButton}
          </div>

          <div className="col-md-2">
            <RemoveButton onClick={this.onRemove.bind(this, index)} />
          </div>
        </div>
      );
    });
    return (
      <div className="panel panel-default">
        <div className="panel-body">

          <div className="row">
            <div className="col-md-2">
              <label>Name</label>
            </div>

            <div className="col-md-2">
              <label>Button Type</label>
            </div>

            <div className="col-md-3">
              <label>Value</label>
            </div>
          </div>

          {list}

          <div className="row" >
            <div className="col-md-3">
              <AddButton onClick={this.onAdd.bind(this)} style={{marginTop: 4, width:100}} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
