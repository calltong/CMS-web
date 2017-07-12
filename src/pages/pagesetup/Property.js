import React from 'react';
import Draggable from 'react-draggable';

//import {actions} from '../../actions/Action';

import EnButton from '../../forms/EnButton';

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
        defaultPosition={{x:500, y:10}}
        handle=".handle">
        <div className="panel panel-page-property">
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
