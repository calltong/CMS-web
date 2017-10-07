import React from 'react';

//import {store} from '../../store';
import {actions} from '../../actions/Action';
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
        actions.product.addImage(inVariant, data, this.width, this.height);
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
        actions.product.editImage(inVariant, index, data, this.width, this.height);
      };
    };
    reader.readAsDataURL(files[0]);
  }

  onRemove(index) {
    actions.product.removeImage(this.props.index, index);
  }

  render() {
    let list = this.props.data.map((item, index) => {
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
          <EnImageSelector height="255px" width="170px"
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
        <div className="panel-heading">Image 15x10</div>
        <div className="panel-body">
          <div className="row">
            {list}
            <div className="col-md-2">
              <div className="form-group">
                <EnImageSelector height="255px" width="170px"
                  onDrop={this.onDropImage.bind(this)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
