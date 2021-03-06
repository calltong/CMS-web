import React from 'react';

import EnText from '../../../forms/EnText';
import EnButton from '../../../forms/EnButton';

export default class ModernContent extends React.Component {
  constructor(props) {
    super(props);
    console.log('Modern Start:', this.props.data);
    if (this.props.data.data) {
      this.state = this.props.data;
    } else {
      this.state = {
        type: 'modern',
        data: {
          name: '',
          detail: '',
          list: [],
        },
      };
    }
  }

  nameChange(event) {
    let data = this.state.data;
    data.name = event.target.value;
    this.setState({data:data});
  }

  detailChange(event) {
    let data = this.state.data;
    data.detail = event.target.value;
    this.setState({data:data});
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
    let list = data.list.map((item, index) => {
      return (
        <div className="row" key={index} style={{marginTop:'5px'}}>
          <div className="col-md-5">
            <EnText
              placeholder="Enter type..."
              value={item.preview || ''}
              onChange={this.previewChange.bind(this, index)} />
          </div>

          <div className="col-md-5">
            <EnText
              placeholder="Enter link..."
              value={item.value || ''}
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
      <div className="row" style={{marginTop:10}}>
        <div className="col-md-12">
          <div className="panel panel-content">
            <div className="panel-heading">
              Modern Content
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-5">
                  <div className="form-group">
                    <label>Title</label>
                    <EnText
                      placeholder="Enter Title..."
                      value={this.state.data.name || ''}
                      onChange={this.nameChange.bind(this)} />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-5">
                  <div className="form-group">
                    <label>Detail</label>
                    <EnText
                      placeholder="Enter Detail..."
                      value={this.state.data.detail || ''}
                      onChange={this.detailChange.bind(this)} />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-5">
                  <label>Preview</label>
                </div>

                <div className="col-md-5">
                  <label>Value</label>
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

            <div className="panel-footer">
              <EnButton className="btn btn-add"
                onClick={this.props.save} style={{width:100}}>
                Save
              </EnButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
