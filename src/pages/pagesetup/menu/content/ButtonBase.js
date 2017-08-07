import React from 'react';
import EnButton from '../../../../forms/button/EnButton';
import AddButton from '../../../../forms/button/AddButton';

export default class ButtonBase extends React.Component {
  onChange(index) {
    this.props.onChange(index);
  }

  render() {
    let css = {
      marginTop: '5px',
      marginBottom: '5px',
    };
    let onAdd = <div />;
    let selected = this.props.selected;
    if (this.props.onAdd !== undefined) {
      onAdd = (<AddButton className="btn-pmenu-full" onClick={this.props.onAdd} />);
    }
    return (
      <div>
        <EnButton
          className={selected === undefined ? 'btn btn-pmenu-selected btn-pmenu-full' : 'btn btn-pmenu btn-pmenu-full'}
          onClick={this.onChange.bind(this, undefined)} >
          {this.props.title}
        </EnButton>
        <div className="page-menu-body">
          {this.props.children}
        </div>
        <hr style={css}/>
        {onAdd}
      </div>
    );
  }
}
