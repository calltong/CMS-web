import React, {Component} from 'react';
import DropZone from 'react-dropzone';

export default class EnImageSelector extends Component {
  render() {
    let lineHeight = this.props.lineHeight !== undefined ? `${this.props.lineHeight}px` : '150px';
    let width = this.props.width || '100%';
    let height = this.props.height || '100%';
    let maxWidth = this.props.maxWidth;
    let maxHeight = this.props.maxHeight;

    let style = {
      width,
      height,
      maxWidth,
      maxHeight,
      padding: '2px',
      borderRadius: '2px',
      cursor: 'pointer',
      display: 'block',
      margin: '0 auto',
    };

    let preview;
    if (this.props.src) {
      preview = <img style={style} role="presentation" src={this.props.src} />;
    } else {
      let css = {
        border: '1px solid #ccc',
        height: '100%',
        textAlign: 'center',
        lineHeight: lineHeight,
      };
    
      preview = (
        <div style={css}>
          {this.props.placeholder || 'เลือกรูป'}
        </div>
      );
    }
    return (
      <DropZone style={style} accept={this.props.accept} multiple={false} onDrop={this.props.onDrop}>
        {preview}
      </DropZone>
    );
  }
}
