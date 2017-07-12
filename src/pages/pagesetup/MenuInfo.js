import React from 'react';
import Select from 'react-select';

import EnText from '../../forms/EnText';
import PickerColor from '../../forms/PickerColor';
import PickerFont from '../../forms/PickerFont';
import AddButton from '../../forms/AddButton';
import RemoveButton from '../../forms/RemoveButton';

import {store} from '../../store';
import {actions} from '../../actions/Action';

class Brandner extends React.Component {
  buttonTypeChange(value) {
    console.log(':type:', value);
    let menu = this.menu;
    menu.brand.type = value.value;
    actions.page.setMenu(menu);
  }

  nameChange(event) {
    let menu = this.menu;
    menu.brand.name = event.target.value;
    actions.page.setMenu(menu);
  }

  colorChange(color) {
    let menu = this.menu;
    menu.brand.css.color = color;
    actions.page.setMenu(menu);
  }

  fontChange(font, size) {
    let menu = this.menu;
    menu.brand.css.font = font;
    menu.brand.css.size = size;
    actions.page.setMenu(menu);
  }

  render() {
    let menu = this.props.menu;
    this.menu = menu;
    let options = [
      {value: 'text', label: 'Text'},
      {value: 'image', label: 'Image'},
    ];

    return (
    <div>
      <h4>Brandner</h4>
      <hr/>
      <div className="row">
        <div className="col-md-2">
          <div className="form-group">
            <label>ชนิด</label>
            <Select
              clearable={false}
              searchable={false}
              value={'text'}
              options={options}
              onChange={this.buttonTypeChange.bind(this)} />
          </div>
      </div>
        <div className="col-md-2">
          <div className="form-group">
            <label>ชื่อ</label>
            <EnText
              placeholder="Enter name..."
              value={menu.brand.name || ''}
              onChange={this.nameChange.bind(this)} />
          </div>
        </div>

        <div className="col-md-2">
          <div className="form-group">
            <label>สีตัวอักษร</label>
            <br/>
            <PickerColor
              value={menu.brand.css.color}
              onChange={this.colorChange.bind(this)}/>
          </div>
        </div>

        <div className="col-md-3">
          <div className="form-group">
            <label>แบบตัวอักษร</label>
            <PickerFont
              size={menu.brand.css.size}
              font={menu.brand.css.font}
              onChange={this.fontChange.bind(this)}/>
          </div>
        </div>
      </div>

    </div>
    );
  }
}

class MenuBar extends React.Component {
  nameChange(index, event) {

  }

  buttonTypeChange(index, value) {
    console.log(index, ':type:', value);
    let menu = this.menu.list[index];
    menu.type = value.value;
    actions.page.setMenuItem(index, menu);
  }

  valueChange(index, type, event) {
    console.log(index, ':type:', type, ' val:', event);
    let menu = this.menu.list[index];
    if (type === 'category') {
      menu.value = event === null ? '': event.value;
    } else {
      menu.value = event.target.value;
    }
    actions.page.setMenuItem(index, menu);
  }

  onAdd() {

  }

  onRemove(index) {

  }

  render() {
    let menu = this.props.menu;
    this.menu = menu;
    let list = menu.list;
    let type_list = store.getState().product.type_list;

    let types = type_list.map(item => {
      return {value: item._id, label: item.name, clearableValue: false};
    });
    let options = [
      {value: 'category', label: 'Category'},
      {value: 'tag', label: 'Tag'},
      {value: 'sale', label: 'Sale Price'},
    ];

    let menus = list.map((item, index) => {
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
          <div className="col-md-3">
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
      <div>
        <h4>เมนู</h4>
        <hr/>

        <div className="row">
          <div className="col-md-3">
            <label>ชื่อ</label>
          </div>

          <div className="col-md-2">
            <label>ชนิด Link</label>
          </div>

          <div className="col-md-3">
            <label>Value</label>
          </div>
        </div>

        {menus}
        <div className="row" >
          <div className="col-md-3">
            <AddButton onClick={this.onAdd.bind(this)} style={{marginTop: 4, width:100}} />
          </div>
        </div>
      </div>
    );
  }
}

export default class MenuInfo extends React.Component {
  state = {
    displayColor: false,
  };

  nameChange(index, event) {

  }

  colorChange(color) {
    let data = this.data;
    data.menu.css.color = color;
    actions.page.setMenu(data.menu);
  }

  colorBgChange(color) {
    let data = this.data;
    data.menu.css.bg_color = color;
    actions.page.setMenu(data.menu);
  }

  fontChange(font, size) {
    let menu = this.data.menu;
    menu.css.font = font;
    menu.css.size = size;
    actions.page.setMenu(menu);
  }

  render() {
    let data = this.props.data;
    this.data = data;
    let menu = data.menu;
    return (
      <div className="panel panel-default">
        <div className="panel-body">

          <div className="row">
            <div className="col-md-2">
              <div className="form-group">
                <label>สีเมนู</label>
                <br/>
                <PickerColor
                  value={menu.css.bg_color}
                  onChange={this.colorBgChange.bind(this)}
                  />
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group">
                <label>สีตัวอักษร</label>
                <br/>
                <PickerColor
                  value={menu.css.color}
                  onChange={this.colorChange.bind(this)}
                  />
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group">
                <label>แบบตัวอักษร</label>
                <PickerFont
                  size={menu.css.size}
                  font={menu.css.font}
                  onChange={this.fontChange.bind(this)}/>
              </div>
            </div>
          </div>
          <br/>
          <Brandner menu={menu} />
          <br/>
          <MenuBar menu={menu} />
        </div>
      </div>
    );
  }
}
