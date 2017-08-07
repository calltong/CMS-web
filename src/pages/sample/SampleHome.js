import React from 'react';

import Menu from './Menu';
import Footer from './Footer';
import Builder from './content/Builder';

export class SampleHome extends React.Component {
  render() {
    let page = this.props.page;
    return (
      <div>
        <Menu content={page.menu} />
        <Builder list={page.content_list} />
        <Footer content={page.footer} />
      </div>
    );
  }
}

export default SampleHome;
