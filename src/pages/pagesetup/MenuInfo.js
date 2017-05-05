import React from 'react';

import EnText from '../../forms/EnText';
import EnButton from '../../forms/EnButton';

export default class MenuInfo extends React.Component {

  nameChange(index, event) {

  }

  conditionChange(index, event) {

  }

  onRemove(index) {

  }

  onAdd() {

  }

  render() {
    let data = this.props.data;

    let index = -1;
    let list = data.menu_list.map(item => {
      index++;
      return (
        <div className="row" key={index} style={{marginTop:'5px'}}>
          <div className="col-md-3">
            <EnText
              placeholder="Enter name..."
              value={item.name  || ''}
              onChange={this.nameChange.bind(this, index)} />
          </div>

          <div className="col-md-5">
            <EnText
              placeholder="Enter condition..."
              value={item.condition  || ''}
              onChange={this.conditionChange.bind(this, index)} />
          </div>

          <div className="col-md-2">
            <EnButton className="btn btn-remove" onClick={this.onRemove.bind(this, index)}>
              Remove
            </EnButton>
          </div>
        </div>
      );
    });
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Menu List
        </div>
        <div className="panel-body">

          <div className="row">
            <div className="col-md-3">
              <label>Name</label>
            </div>

            <div className="col-md-5">
              <label>Condition</label>
            </div>
          </div>

          {list}

          <div className="row" >
            <div className="col-md-3">
              <EnButton className="btn btn-add" onClick={this.onAdd.bind(this)} style={{marginTop:'10px', width:100}}>
                Add
              </EnButton>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
