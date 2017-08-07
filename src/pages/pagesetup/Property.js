import React from 'react';
import Draggable from 'react-draggable';

import {manager} from '../../utility/Manager';
import {store} from '../../store';
import EnButton from '../../forms/button/EnButton';

export default class Property extends React.Component {
  state = {
    display: 'block',
  };

  onDisplay() {
    this.setState({display: 'block'});
  }

  onClose() {
    let form = store.getState().page.form;
    form.property.display = 'none';
    store.update('PAGE_GEN_PAGE', {data: form});
  }

  render() {
    let css = {
      width: '100%',
    };

    let x = manager.GetWidth() - 350;
    return (
      <Draggable
        defaultPosition={{x: x, y: 50}}
        handle=".handle">
        <div
          style={{display: this.props.display}}
          className="panel property">
          <div className="panel-heading handle">
            Properties
          </div>
          <div className="panel-body">
            {this.props.children}
          </div>
          <div className="panel-footer">
            <EnButton
              className="btn btn-normal"
              style={css}
              onClick={this.onClose.bind(this)}><i className="fa fa-times-circle-o" /> Close</EnButton>
          </div>
        </div>
      </Draggable>
    );
  }
}
