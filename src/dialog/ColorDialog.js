import React from 'react';
import {observer, inject} from 'mobx-react';

import WindowDialog from './WindowDialog';
import EnButton from '../forms/button/EnButton';

export class ColorDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      index: -1,
      selected: undefined,
    };
  }

  componentDidMount() {
    this.props.ma_color.getList();
  }

  select(item, index) {
    this.setState({index: index, selected: item});
  }

  onConfirm() {
    this.setState({index: -1, selected: undefined});
    if (this.props.onSelected) this.props.onSelected(this.state.selected);
  }

  render() {
    let setting = {
      id: this.props.id,
      title: 'เลือกสีสินค้า',
      confirm: 'ตกลง',
      close: 'ปิด',
      confirmDisabled: this.state.selected === undefined,
    };
    let color = this.props.ma_color.toJS();
    let hides = this.props.list || [];
    let css = {
      width: '100%',
      height: '100%',
    };

    let list = color.list.map((item, index) => {
      let hide = hides.find(ob => {
        return ob.value === item._id;
      });

      return (
        <div className="col-md-2" style={{marginBottom: '5px'}} key={index}>
          <EnButton
            disabled={hide}
            style={css}
            className={this.state.index === index ? 'btn btn-select' : 'btn btn-normal'}
            onClick={this.select.bind(this, item, index)}>
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

export default inject('ma_color')(observer(ColorDialog));
