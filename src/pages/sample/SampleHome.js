import React from 'react';

import Menu from './Menu';
import Builder from './content/Builder';

export class SampleHome extends React.Component {

  render() {
    let page = this.props.page;
    return (
      <div>
        <Menu menu={page.menu} />
        <Builder list={page.content_list} />
      </div>
    );
  }
}

export default SampleHome;
