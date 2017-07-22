import React from 'react';
import PickerColor from '../../../forms/PickerColor';

import EnText from '../../../forms/EnText';
import {actions} from '../../../actions/Action';

export default class MainMenuProperty extends React.Component {
  nameChange(event) {
    this.menu.brand.name = event.target.value;
    actions.page.setMenu(this.menu);
  }

  colorChange(color) {
    //let menu = this.menu;
    //menu.brand.css.color = color;
    //actions.page.setMenu(menu);
  }

  render() {
    this.menu = this.props.menu;
    let menu = this.menu;
    return (
      <div>
        <div className="form-group">
          <label>ชื่อร้าน</label>
          <EnText
            value={menu.brand.name}
            onChange={this.nameChange.bind(this)}
            placeholder="ชื่อร้าน.." />
        </div>
        <div className="form-group">
          <label>แบบตัวหนังสือ</label>
          <EnText placeholder="แบบตัวหนังสือ.." />
        </div>
        <hr />
        <div className="form-group">
          <label>สีพื้นหลัง</label>
          <PickerColor
            value={menu.brand.css.color}
            onChange={this.colorChange.bind(this)}/>
        </div>
        <div className="form-group">
          <label>แบบตัวหนังสือ</label>
          <EnText placeholder="แบบตัวหนังสือ.." />
        </div>
      </div>
    );
  }
}
