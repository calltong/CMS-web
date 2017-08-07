import React from 'react';

export default class WindowDialog extends React.Component {
  render() {
    let setting = this.props.setting;
    let css = {
      width: '120px',
    };
    return (
      <div className="modal" id={setting.id} tabIndex="-1" role="dialog">
        <div className="modal-dialog choose-product-body" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{setting.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
              <button
                style={css}
                type="button"
                className="btn btn-normal"
                data-dismiss="modal">
                <i className="fa fa-times-circle-o"/> {setting.close}
              </button>
              <button
                style={css}
                type="button"
                disabled={setting.confirmDisabled || false}
                className="btn btn-normal"
                onClick={this.props.onConfirm}
                data-dismiss="modal">
                <i className="fa fa-check-circle-o"/> {setting.confirm}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
