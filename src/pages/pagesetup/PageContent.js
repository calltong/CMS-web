import React from 'react';

import {store} from '../../store';
import EnText from '../../forms/EnText';
import EnButton from '../../forms/EnButton';
import SlideContent from './SlideContent';
import ModernContent from './ModernContent';
import CategoryContent from './CategoryContent';
import BlockContent from './BlockContent';

export default class PageContent extends React.Component {
  state = {
    content: undefined,
    index: -1,
  };

  typeChange(index, event) {

  }

  onAdd() {
    let data = {
      type: 'block',
      data: undefined,
    };

    store.update('PAGE_ADD_CONTENT', {data: data});
  }

  onEdit(content, index) {
    if (this.state.index !== -1) {
      store.update('PAGE_SET_CONTENT', {index: this.state.index, data: this.refs.content.state});
      this.refs.content.state = content;
    }

    this.setState({content:content, index:index});
  }

  onRemove(index) {
    store.update('PAGE_REMOVE_CONTENT', {index: index});
  }

  onSave() {
    let index = this.state.index;
    let data = this.refs.content.state;
    if (index !== -1) {
      store.update('PAGE_SET_CONTENT', {index: index, data: data});
    }
  }

  render() {
    let data = this.props.data;
    let index = -1;
    let list = data.content_list.map(item => {
      index++;
      return (
        <div className="row" key={index} style={{marginTop:'5px'}}>
          <div className="col-md-3">
            <EnText
              placeholder="Enter type..."
              value={item.type}
              onChange={this.typeChange.bind(this, index)} />
          </div>

          <div className="col-md-1">
            <EnButton className="btn btn-normal" onClick={this.onEdit.bind(this, item, index)}>
              Edit
            </EnButton>
          </div>

          <div className="col-md-1">
            <EnButton className="btn btn-remove" onClick={this.onRemove.bind(this, index)}>
              Remove
            </EnButton>
          </div>
        </div>
      );
    });

    let content = function(cont, save) {
      if (cont) {
        switch (cont.type) {
          case 'slide':
            return (
              <div className="row" style={{marginTop:10}}>
                <SlideContent ref="content" save={save} data={cont}/>
              </div>
            );
          case 'modern':
            return (
              <div className="row" style={{marginTop:10}}>
                <ModernContent ref="content" save={save} data={cont}/>
              </div>
            );
          case 'category':
            return (
              <div className="row" style={{marginTop:10}}>
                <CategoryContent ref="content" save={save} data={cont}/>
              </div>
            );
          case 'block':
            return (
              <div className="row" style={{marginTop:10}}>
                <BlockContent ref="content" save={save} data={cont}/>
              </div>
            );

          default:
            return <div/>;
        }
      } else {
        return <div/>;
      }

    }(this.state.content, this.onSave.bind(this));
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Content List
        </div>
        <div className="panel-body">

          <div className="row">
            <div className="col-md-3">
              <label>Type</label>
            </div>

            <div className="col-md-1">
              <label>&nbsp;</label>
            </div>
            <div className="col-md-1">
              <label>&nbsp;</label>
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

          {content}

        </div>
      </div>
    );
  }
}
