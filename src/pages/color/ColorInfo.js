import React from 'react';

import CompleteSection from '../../forms/CompleteSection';
import EnText from '../../forms/EnText';
import EnHeader from '../../forms/EnHeader';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';

class Information extends React.Component {

  nameChange(event) {
    let data = this.props.data;
    data.name = event.target.value;
    store.update('COLOR_STORE_ITEM', {data: data});
  }

  render() {
    let data = this.props.data;
    let check = this.props.check;

    return (
    <div>
      <div className={check? "form-group has-error": "form-group"}>
        <label>Name</label>
        <EnText
          placeholder="Enter name..."
          value={data.name}
          onChange={this.nameChange.bind(this)} />
      </div>
    </div>
    )
  }
}

export class ColorInfo extends ReducerBase {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
    };
  }

  componentDidMount() {
    let id = this.props.params.id;
    if (id) {
      store.update('COLOR_GET_ITEM', {id});
    } else {
      store.update('COLOR_RESET_ITEM');
    }
  }

  onSave() {
    let ob = store.getState().color;
    if (ob.data.name === '') {
      this.state.check = true;
      this.setState(this.state);
    } else {
      store.update('COLOR_SAVE_ITEM');
    }
  }

  render() {
    let state = this.state;
    let ob = store.getState().color;

    return (
      <div className="container-fluid">
        <EnHeader name="Color Information"/>
        <div className="row">
          <div className="col-lg-6">
            <div className="panel panel-default">
              <div className="panel-heading">Information</div>
              <div className="panel-body">
                <Information
                  data={ob.data}
                  check={state.check} />
              </div>
            </div>
          </div>
        </div>

        <CompleteSection close={`/ColorManager`} save={this.onSave.bind(this)} />
      </div>
    );
  }
}

export default ColorInfo;
