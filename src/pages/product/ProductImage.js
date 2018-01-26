import React from 'react';

import EnImageSelector from '../../forms/EnImageSelector';
import EnButton from '../../forms/button/EnButton';

export default class ProductImage extends React.Component {
  onDropImage(files) {
    let inVariant = this.props.index;
    let reader = new FileReader();
    reader.onload = function(event) {
      let image = new Image();
      image.src = event.target.result;
      image.onload = function() {
        // access image size here
        let data = event.target.result;
        this.props.ma_product.addImage(inVariant, data, this.width, this.height);
      };
    };
    reader.readAsDataURL(files[0]);
  }

  onIndexDropImage(index, files) {
    let inVariant = this.props.index;
    let reader = new FileReader();
    reader.onload = function(event) {
      let image = new Image();
      image.src = event.target.result;
      image.onload = function() {
        // access image size here
        let data = event.target.result;
        this.props.ma_product.editImage(inVariant, index, data, this.width, this.height);
      };
    };
    reader.readAsDataURL(files[0]);
  }

  onRemove(index) {
    this.props.ma_product.removeImage(this.props.index, index);
  }

  render() {
    let size = this.props.size || {title: '10x10', height: '180px', width: '180px'}
    let list = this.props.list.map((item, index) => {
      let note = '';
      if (item.width && item.height) {
        note = `note: ${item.height} x ${item.width}`;
      }
      let css = {
        marginTop: '10px',
        textAlign: 'center',
      };
      return (
        <div className="col-md-2" key={index}>
          <EnImageSelector height={size.height} width={size.width}
            src={item}
            onDrop={this.onIndexDropImage.bind(this, index)} />

          <div style={css}>
            <EnButton
              className="btn btn-remove"
              onClick={this.onRemove.bind(this, index)}
              style={{marginTop: 4, marginBottom: 4}} >
              <i className="fa fa-close" data-tip="delete"/> Remove
            </EnButton>
            <p>{note}</p>
          </div>
        </div>
      );
    });

    return (
      <div className="panel panel-info">
        <div className="panel-heading">Image {size.title}</div>
        <div className="panel-body">
          <div className="row">
            {list}
            <div className="col-md-2">
              <div className="form-group">
                <EnImageSelector height={size.height} width={size.width}
                  onDrop={this.onDropImage.bind(this)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
