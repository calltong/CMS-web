import React from 'react';

import SaveButton from '../../forms/button/SaveButton';
import BuildButton from '../../forms/button/BuildButton';
import ResetButton from '../../forms/button/ResetButton';
import EnButton from '../../forms/button/EnButton';

import {store} from '../../store';
import {actions} from '../../actions/Action';

export default class PageInfoMenu extends React.Component {
  onSave() {
    actions.page.main.saveAllPage();
  }

  onBuild() {
    actions.page.main.buildPage();
  }

  onReset() {
  }

  onDisplayMenu() {
    let form = store.getState().page.form;
    form.menu.display = form.menu.display === 'block' ? 'none' : 'block';
    store.update('PAGE_GEN_PAGE', {data: form});
  }

  onDisplayProperty() {
    let form = store.getState().page.form;
    form.property.display = form.property.display === 'block' ? 'none' : 'block';
    store.update('PAGE_GEN_PAGE', {data: form});
  }

  render() {
    let css = {
      marginRight: '2px',
      width: '140px',
    };
    return (
    <div style={{marginTop: '10px'}}>
      <BuildButton style={css} onClick={this.onBuild.bind(this)} />

      <SaveButton style={css} onClick={this.onSave.bind(this)} />

      <ResetButton style={css} onClick={this.onReset.bind(this)} />

      <EnButton className="btn btn-normal"
        onClick={this.onDisplayMenu.bind(this)}
        style={css}>
        <i className="fa fa-bars" /> Pages Menu
      </EnButton>
      <EnButton
        onClick={this.onDisplayProperty.bind(this)}
        className="btn btn-normal"
        style={css}>
        <i className="fa fa-tasks" /> Properties
      </EnButton>
    </div>
    );
  }
}
