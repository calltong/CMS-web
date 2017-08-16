import React from 'react';

import Menu from './Menu';
import Footer from './Footer';
import Builder from './content/Builder';
import HowToBuy from './HowToBuy';
import AboutUs from './AboutUs';

export class SampleHome extends React.Component {
  render() {
    let selected = this.props.selected;
    let page = this.props.page;
    let body = <div />;
    switch (selected.main) {
      case 'AboutUs':
        body = <AboutUs data={page.about_us} />;
        break;
      case 'HowToBuy':
        body = <HowToBuy data={page.how_to_buy} />;
        break;
      default:
        body = <Builder list={page.content_list} />;
        break;

    }
    return (
      <div>
        <Menu content={page.menu} />
        {body}
        <Footer content={page.footer} />
      </div>
    );
  }
}

export default SampleHome;
