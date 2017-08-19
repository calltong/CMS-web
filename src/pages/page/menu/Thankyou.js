import React from 'react';

import ButtonBase from './content/ButtonBase';
import {actions} from '../../../actions/Action';

export default class Thankyou extends React.Component {
  onChange(index) {
    actions.page.selectMenuLevel2(index);
  }

  render() {
    let selected = this.props.selected;
    return (
      <ButtonBase
        title="หน้าขอบคุณ"
        selected={selected.level_2}
        onChange={this.onChange} >
        <div />
      </ButtonBase>
    );
  }
}
