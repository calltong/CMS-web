import React from 'react';

import EnText from '../../forms/EnText';
import EnButton from '../../forms/EnButton';

export default class SlideContent extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.data.data) {
      this.state = this.props.data;
    } else {
      this.state = {
        type: 'slide',
        data: {
          name: '',
          list: [],
        },
      };
    }
  }

  previewChange(index, event) {
    let data = this.state.data;
    data.list[index].preview = event.target.value;
    this.setState({data:data});
  }

  valueChange(index, event) {
    let data = this.state.data;
    data.list[index].value = event.target.value;
    this.setState({data:data});
  }

  onRemove(index) {
    let data = this.state.data;
    data.splice(index, 1);
    this.setState({data:data});
  }

  onAdd() {
    let data = this.state.data;
    data.list.push({
      preview: '',
      value: '',
    });

    this.setState({data:data});
  }

  render() {
    let data = this.state.data;
    let index = -1;
    let list = data.list.map(item => {
      index++;
      return (
        <div className="row" key={index} style={{marginTop:'5px'}}>
          <div className="col-md-6">
            <EnText
              placeholder="Enter type..."
              value={item.preview}
              onChange={this.previewChange.bind(this, index)} />
          </div>

          <div className="col-md-4">
            <EnText
              placeholder="Enter link..."
              value={item.value}
              onChange={this.valueChange.bind(this, index)} />
          </div>

          <div className="col-md-2">
            <EnButton className="btn btn-remove" onClick={this.onRemove.bind(this, index)}>
              Remove
            </EnButton>
          </div>
        </div>
      );
    });
    return (
      <div className="panel panel-content">
        <div className="panel-heading">
          Slide Content
        </div>
        <div className="panel-body">

          <div className="row">
            <div className="col-md-6">
              <label>Preview</label>
            </div>

            <div className="col-md-4">
              <label>Link</label>
            </div>
          </div>

          {list}

          <div className="row" >
            <div className="col-md-2">
              <EnButton className="btn btn-add" onClick={this.onAdd.bind(this)} style={{marginTop:'10px', width:100}}>
                Add
              </EnButton>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
