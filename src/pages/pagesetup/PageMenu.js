import React from 'react';
import Draggable from 'react-draggable';
import {ReducerBase} from '../../ReducerBase';

import {store} from '../../store';
import {actions} from '../../actions/Action';
import EnButton from '../../forms/EnButton';

import MainMenu from './menu/MainMenu';
import MenuContent from './menu/MenuContent';

export default class PageMenu extends ReducerBase {
  onBack() {
    actions.page.backPageMenu();
  }

  onChange(val, index) {
    actions.page.selectPageMenu(index);
  }

  render() {
    let page = store.getState().page;
    let page_menu = page.page_menu;
    let css = {
      marginBottom: '2px',
      width: '100%',
    };

    let menus = [];
    let back = (<div/>);

    if (page_menu.selected !== undefined) {
      let hrcss = {
        marginTop: '5px',
        marginBottom: '5px',
        borderTop: '1px solid white',
      };
      back = (<div>
        <EnButton
          className="btn btn-pmenu-back"
          style={css}
          onClick={this.onBack.bind(this)} >
          <i className="fa fa-chevron-circle-left"/> Back
        </EnButton>
        <hr style={hrcss}/>
      </div>);

      if (page_menu.selected === 0) {
        menus = <MenuContent list={page.data.menu.list} selected={page_menu.sub_selected} />;
      }
    } else {
      menus = <MainMenu list={page_menu.menu} />;
    }

    return (
      <Draggable
        defaultPosition={{x:0, y:140}}
        handle=".handle">
        <div className="panel page-menu">
          <div className="panel-heading handle">
            Pages Menu
          </div>
          <div className="panel-body">
            {back}
            {menus}
          </div>
          <div className="panel-footer">
            <EnButton className="btn btn-normal" style={css}>Close</EnButton>
          </div>
        </div>
      </Draggable>
    );
  }
}
