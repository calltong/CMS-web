import React from 'react';
import Draggable from 'react-draggable';
import {ReducerBase} from '../../ReducerBase';

import {store} from '../../store';
import {actions} from '../../actions/Action';
import SaveButton from '../../forms/SaveButton';
import BuildButton from '../../forms/BuildButton';
import ResetButton from '../../forms/ResetButton';
import EnButton from '../../forms/EnButton';

export default class PageMenu extends ReducerBase {

  onSave() {
    actions.page.saveItem();
    //store.update('PAGE_SAVE_ITEM');
  }

  onBuild() {
    //let id = this.props.params.id;
    //store.update('PAGE_GEN_PAGE', {id});
  }

  onReset() {
    //let id = this.props.params.id;
    //store.update('PAGE_GEN_PAGE', {id});
  }

  onChange(val, index) {
    console.log('val:', val);
    actions.page.selectPageMenu(index);
    //let id = this.props.params.id;
    //store.update('PAGE_GEN_PAGE', {id});
  }

  render() {
    let page = store.getState().page.page_menu;
    let css = {
      marginBottom: '2px',
      width: '100%',
    };

    let cssSub = {
      marginBottom: '2px',
      width: '85%',
    };

    let list = [
      {
        name: 'Menu',
      },
      {
        name: 'Home',
      },
      {
        name: 'Product List',
      },
      {
        name: 'Product Information',
      },
      {
        name: 'Checkout',
      },
      {
        name: 'Contact us',
      },
      {
        name: 'Thank you',
      },
      {
        name: 'Footer',
      },
    ];

    let menus = list.map((item, index) => {
      return (
        <div key={index}>
          <EnButton
            className={page.selected === index ? 'btn btn-tree-selected' : 'btn btn-tree'}
            style={css}
            onClick={this.onChange.bind(this, item.name, index)} >
            <i className="fa fa-list" /> {item.name}
          </EnButton>
          <EnButton
            className={page.selected === index ? 'btn btn-tree-selected' : 'btn btn-tree pull-right'}
            style={cssSub}
            onClick={this.onChange.bind(this, item.name, index)} >
            <i className="fa fa-minus" /> {item.name}
          </EnButton>
        </div>
      );
    });
    return (
      <Draggable
        defaultPosition={{x:0, y:10}}
        handle=".handle">
        <div className="panel panel-page-menu">
          <div className="panel-heading handle">
            Pages
          </div>
          <div className="panel-body">
            {menus}
          </div>
          <div className="panel-footer">
            <BuildButton style={css} onClick={this.onBuild.bind(this)} />

            <SaveButton style={css} onClick={this.onSave.bind(this)} />

            <ResetButton style={css} onClick={this.onReset.bind(this)} />

            <EnButton className="btn btn-normal" style={css}>Close</EnButton>
          </div>
        </div>
      </Draggable>
    );
  }
}
