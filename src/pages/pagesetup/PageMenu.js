import React from 'react';
import Draggable from 'react-draggable';
import {ReducerBase} from '../../ReducerBase';

import {store} from '../../store';
import {actions} from '../../actions/Action';
import EnButton from '../../forms/button/EnButton';

import MainMenu from './menu/MainMenu';
import Menu from './menu/Menu';
import Home from './menu/Home';
import Footer from './menu/Footer';
import AboutUs from './menu/AboutUs';
import OrderCondition from './menu/OrderCondition';
import ToBuy from './menu/ToBuy';

export default class PageMenu extends ReducerBase {
  onBack() {
    actions.page.backMenu();
  }

  onClose() {
    let form = store.getState().page.form;
    form.menu.display = 'none';
    store.update('PAGE_GEN_PAGE', {data: form});
  }

  onChange(val, index) {
    actions.page.selectPageMenu(index);
  }

  render() {
    let page = store.getState().page;
    let data = page.data;
    let page_menu = page.page_menu;
    let selected = page_menu.selected;
    let css = {
      marginBottom: '2px',
      width: '100%',
    };

    let menus = [];
    let back = (<div/>);

    if (selected.main !== undefined) {
      let hrcss = {
        marginTop: '5px',
        marginBottom: '5px',
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

      switch (selected.main) {
        case 'Menu':
          menus = <Menu list={data.menu.list} selected={selected} />;
          break;
        case 'Home':
          menus = <Home list={data.content_list} selected={selected} />;
          break;
        case 'Footer':
          menus = <Footer list={data.footer.list} selected={selected} />;
          break;
        case 'OrderCondition':
          menus = <OrderCondition list={data.condition.list} selected={selected} />;
          break;
        case 'HowToBuy':
          menus = <ToBuy list={data.how_to_buy.list} selected={selected} />;
          break;
        case 'AboutUs':
          menus = <AboutUs list={data.about_us.list} selected={selected} />;
          break;
        default:
      }
    } else {
      menus = <MainMenu list={page_menu.menu} />;
    }

    return (
      <Draggable
        defaultPosition={{x: -30, y: 50}}
        handle=".handle">
        <div
          style={{display: this.props.display}}
          className="panel page-menu">
          <div className="panel-heading handle">
            Pages Menu
          </div>
          <div className="panel-body">
            {back}
            {menus}
          </div>
          <div className="panel-footer">
            <EnButton className="btn btn-normal"
              onClick={this.onClose.bind(this)}
              style={css}>
              <i className="fa fa-times-circle-o" /> Close
            </EnButton>
          </div>
        </div>
      </Draggable>
    );
  }
}
