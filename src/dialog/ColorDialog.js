import React from 'react';

import {ReducerBase} from '../ReducerBase';
import WindowDialog from '../forms/WindowDialog';
import EnButton from '../forms/button/EnButton';

import {actions} from '../actions/Action';
import {store} from '../store';

export default class ColorDialog extends ReducerBase {
  componentDidMount() {
    actions.color.getList();
  }

  select(item) {
    actions.dialog.selectColor(item);
  }

  onConfirm() {
    let dialog = store.getState().dialog;
    if (dialog.color.confirm) {
      dialog.color.confirm(dialog.color.value, dialog.color.item);
      actions.dialog.resetColor();
    }
  }

  render() {
    let setting = {
      id: 'choose_color',
      title: 'เลือกสีสินค้า',
      confirm: 'ตกลง',
      close: 'ปิด',
      confirmDisabled: true,
    };
    let state = store.getState();
    let color = state.color;
    let verify = state.dialog.color.verify;
    let colorSelected = state.dialog.color;
    let selected = undefined;
    if (colorSelected.value) {
      selected = colorSelected.value._id;
      setting.confirmDisabled = false;
    }

    let css = {
      width: '100%',
      height: '100%',
    };
    let data_list = color.data_list;
    let list = data_list.map((item, index) => {
      let have = verify.find(it => {
        return it.value === item._id;
      });

      let cssBtn = 'btn btn-normal';
      if (have === undefined && selected === item._id) {
        cssBtn = 'btn btn-select';
      }
      return (
        <div className="col-md-2" key={index}>
          <EnButton
            disabled={have !== undefined}
            style={css}
            className={cssBtn}
            onClick={this.select.bind(this, item)}>
            {item.content.main.name}
          </EnButton>
        </div>
      );
    });
    return (
      <WindowDialog setting={setting} onConfirm={this.onConfirm.bind(this)}>
        <div className="row">
          {list}
        </div>
      </WindowDialog>
    );
  }
}
