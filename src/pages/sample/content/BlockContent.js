import React from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';

export class BlockContent extends React.Component {

  onGotoPage(id) {
    browserHistory.push(`/product/${id}`);
  }

  render() {
    let content = this.props.content;
    /*
    let list = content.data.list.map(item => {
      return (
      <div className="col-xs-4 col-sm-3 col-md-1" style={{paddingLeft:0, paddingRight:0}} key={index++}>
        <Link onClick={this.onGotoPage.bind(this, item.value)}>
          <div className="block-img" style={{backgroundImage: `url(${item.preview})`}}>
            <button className="btn btn-block-next" onClick={this.onGotoPage.bind(this, item.value)}>
              I want it
            </button>
          </div>
        </Link>
      </div>
      );
    });
    */

    let list = content.data.list.map((item, index) => {
      return (
      <div className="col-xs-3 col-sm-2 col-md-2" style={{paddingLeft:0, paddingRight:0}} key={index}>
        <Link onClick={this.onGotoPage.bind(this, item.value)}>
          <img src={item.preview} role="presentation" className="block-content-img" />
        </Link>
      </div>
      );
    });

    return (
      <div className="block-content">
        <div className="header">
          {content.data.name}
        </div>
        <div className="body">
          <div className="row none-row">
            {list}
          </div>
        </div>
      </div>
    );
  }
}

export default BlockContent;
