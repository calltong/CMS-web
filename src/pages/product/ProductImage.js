import React from 'react';

//import {store} from '../../store';
import {actions} from '../../actions/Action';
import EnImageSelector from '../../forms/EnImageSelector';
import EnButton from '../../forms/EnButton';

export class ProductImage extends React.Component {
  onDropImage(files) {
    let reader = new FileReader();
    reader.onload = function(event) {
      let image = new Image();
      image.src = event.target.result;
      image.onload = function() {
        // access image size here
        let data = event.target.result;
        actions.product.addImage(data, this.width, this.height);
        //store.update('PRODUCT_ADD_IMAGE', {data, width:this.width, height:this.height});
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
        actions.product.editImage(index, data, this.width, this.height);
        //store.update('PRODUCT_EDIT_IMAGE', {index, data, width: this.width, height: this.height});
      };
    };
    reader.readAsDataURL(files[0]);
  }

  onRemove(index) {
    actions.product.removeImage(index);
    //store.update('PRODUCT_REMOVE_IMAGE', {index});
  }

  render() {
    let data = this.props.data;
    let index = -1;
    let list = data.image_list.map(item => {
      index++;
      let note = '';
      if (item.width && item.height) {
        note = `note: ${item.height} x ${item.width}`;
      }

      return (
        <div className="col-md-2" key={index}>
          <EnImageSelector height="208" width="160"
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
        <div className="panel-heading">Image 13x10</div>
        <div className="panel-body">
          <div className="row">
            {list}
            <div className="col-md-2">
              <div className="form-group">
                <EnImageSelector height="208" width="160"
                  onDrop={this.onDropImage.bind(this)}/>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductImage;
