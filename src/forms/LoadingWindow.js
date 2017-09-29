import React, {Component} from 'react';
import ReactLoading from 'react-loading';
import {manager} from '../utility/Manager';

export default class LoadingWindow extends Component {
  onClose() {
    manager.ClosePanel('#Loading');
  }

  render() {
    return (
      <div id="Loading" className="modal fade" tabIndex="-1" role="dialog">
        <div className="modal-dialog window-dialog" role="document">
          <div className="modal-content">

            <div className="window-body">
              <ReactLoading type="spinningBubbles" color="#02E0F6" height={100} width={100} />

              <p>Processing</p>

              <button type="button" className="btn btn-normal"
                onClick={this.onClose.bind(this)}>
                Close
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
