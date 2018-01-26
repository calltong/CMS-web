import React from 'react';
import {observer, inject} from 'mobx-react';

import PickerColor from '../../forms/PickerColor';
import CompleteSection from '../../forms/CompleteSection';
import EnText from '../../forms/EnText';
import EnHeader from '../../forms/EnHeader';

class MainInformation extends React.Component {
  codeChange(color) {
    let data = this.props.data;
    data.code = color;
    this.props.ma_color.setItem(data);
  }

  nameChange(event) {
    let data = this.props.data;
    data.content.main.name = event.target.value;
    this.props.ma_color.setItem(data);
  }

  render() {
    let data = this.props.data;
    let check = this.props.check;
    let css = {
      width: '100%',
    };

    let cssColor = {
      height: '34px',
      width: '100%',
      backgroundColor: data.code,
      border: '1px solid #ccc',
      borderRadius: '5px',
    };

    return (
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>รหัสสี</label>
            <div className="row">
              <div className="col-md-4">
                <div style={cssColor}/>
              </div>
              <div className="col-md-8">
                <PickerColor
                  value={data.code}
                  css={css}
                  onChange={this.codeChange.bind(this)} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className={check ? 'form-group has-error': 'form-group'}>
            <label>ชื่อ</label>
            <EnText
              placeholder="ชื่อ..."
              value={data.content.main.name}
              onChange={this.nameChange.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

class EnglishInformation extends React.Component {
  nameChange(event) {
    let data = this.props.data;
    data.content.english.name = event.target.value;
    this.props.ma_color.setItem(data);
  }

  render() {
    let data = this.props.data;
    let check = this.props.check;

    return (
      <div>
        <div className={check? 'form-group has-error': 'form-group'}>
          <label>Name</label>
          <EnText
            placeholder="name..."
            value={data.content.english.name}
            onChange={this.nameChange.bind(this)} />
        </div>
      </div>
    );
  }
}

export class ColorItem extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    if (id) {
      this.props.ma_color.getItem(id);
    } else {
      this.props.ma_color.resetItem();
    }
  }

  onSave() {
    this.props.ma_color.saveItem();
  }

  render() {
    let data = this.props.ma_color.toJS().data;
    return (
      <div className="container-fluid">
        <EnHeader name="รายละเอียดของสี"/>
        <CompleteSection close={'/color'} save={this.onSave.bind(this)} />
        <div className="row">
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">รายละเอียด</div>
              <div className="panel-body">
                <MainInformation data={data} {...this.props} />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">ภาษาอังกฤษ</div>
              <div className="panel-body">
                <EnglishInformation data={data} {...this.props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default inject('ma_color')(observer(ColorItem));
