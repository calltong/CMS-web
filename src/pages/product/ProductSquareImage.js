import React from 'react';

import {actions} from '../../actions/Action';
import EnImageSelector from '../../forms/EnImageSelector';
import EnButton from '../../forms/EnButton';

export class ProductSquareImage extends React.Component {
  onDropImage(files) {
    let reader = new FileReader();
    reader.onload = function(event) {
      let image = new Image();
      image.src = event.target.result;
      image.onload = function() {
        // access image size here
        let data = event.target.result;
        actions.product.addSqImage(data, this.width, this.height);
      };
    };
    reader.readAsDataURL(files[0]);
  }

  onIndexDropImage(index, files) {
    let reader = new FileReader();

    reader.onload = function(event) {
      let image = new Image();
      image.src = event.target.result;
      image.onload = function() {
        // access image size here
        let data = event.target.result;
        actions.product.editSqImage(index, data, this.width, this.height);
      };
    };
    reader.readAsDataURL(files[0]);
  }

  onRemove(index) {
    actions.product.removeSqImage(index);
    //store.update('PRODUCT_REMOVE_SQ_IMAGE', {index});
  }

  render() {
    let data = this.props.data;

    let list = data.image_square_list.map((item, index) => {
      let note = '';
      if (item.width && item.height) {
        note = `note: ${item.height} x ${item.width}`;
      }

      return (
        <div className="col-md-2" key={index}>
          <EnImageSelector height="180" width="180"
            src={item.data}
            onDrop={this.onIndexDropImage.bind(this, index)}/>

          <EnButton
            className="btn btn-remove"
            onClick={this.onRemove.bind(this, index)}
            style={{marginTop: 4, marginBottom: 4}}>
            <i className="fa fa-close" data-tip="delete"/> Remove
          </EnButton>
          <p>{note}</p>
        </div>
      );
    });

    return (
      <div className="panel panel-info">
        <div className="panel-heading">Image 10x10</div>
        <div className="panel-body">
          <div className="row">
            {list}
            <div className="col-md-2">
              <div className="form-group">
                <EnImageSelector height="180" width="180"
                  onDrop={this.onDropImage.bind(this)}/>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductSquareImage;
