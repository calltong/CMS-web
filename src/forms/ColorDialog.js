import React from 'react';
import { SketchPicker } from 'react-color';
import Draggable from 'react-draggable';

export default class ColorDialog extends React.Component {
  onCompleted(color) {
    console.log('color:', color.hex);
    //this.props.onChange(color.hex);
  }

  render() {
    let css = {
      width: '44%',
      marginRight: '4px',
    };
    let cssOk = {
      width: '54%',
    };
    let color = this.props.value === undefined ? '#FFFFFF' : this.props.value;
    return (
      <Draggable
        defaultPosition={{x:500, y:140}}
        handle=".handle">
        <div
          style={{display: this.props.display}}
          className="panel property">
          <div className="panel-heading handle">
            Color
          </div>
          <div className="panel-body">
            <SketchPicker
              color={color}
              width={240}
              onChangeComplete={ this.onCompleted.bind(this) } />
          </div>
          <div className="panel-footer">
            <button type="button"
              style={css}
              className="btn btn-normal" >Close</button>
            <button type="button"
              style={cssOk}
              className="btn btn-normal" >OK</button>
          </div>
        </div>
      </Draggable>
    );
  }
}
