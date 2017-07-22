import React from 'react';
import Draggable from 'react-draggable';

import EnButton from '../../forms/button/EnButton';

export default class Property extends React.Component {

  onSave() {

  }

  render() {
    let css = {
      marginBottom: '2px',
      width: '100%',
    };
    return (
      <Draggable
        defaultPosition={{x:1000, y:140}}
        handle=".handle">
        <div className="panel property">
          <div className="panel-heading handle">
            Properties
          </div>
          <div className="panel-body">
            {this.props.children}
          </div>
          <div className="panel-footer">
            <EnButton className="btn btn-normal" style={css}>Close</EnButton>
          </div>
        </div>
      </Draggable>
    );
  }
}
