import React from 'react';

import {ReducerBase} from '../../ReducerBase';
import {store} from '../../store';

import CompleteSection from '../../forms/CompleteSection';
import EnHeader from '../../forms/EnHeader';

import BasicInfo from './BasicInfo';
import ProductImage from './ProductImage';
import BasicEngInfo from './BasicEngInfo';
import ProductStock from './ProductStock';

export class ProductInfo extends ReducerBase {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
    };
  }

  componentDidMount() {
    store.update('PRODUCT_GET_TYPE');
    store.update('PRODUCT_GET_SIZE');
    let id = this.props.params.id;
    if (id) {
      store.update('PRODUCT_GET_ITEM', {id});
    } else {
      store.update('PRODUCT_RESET_ITEM');
    }
  }

  onSave() {
    let ob = store.getState().product;
    if (ob.data.name === '' || ob.data.type_id === 0) {
      this.state.check = true;
      this.setState(this.state);
    } else {
      store.update('PRODUCT_SAVE_ITEM');
    }
  }

  render() {
    let state = this.state;
    let ob = store.getState().product;

    return (
      <div className="container">
         <EnHeader name="Product Information"/>
         <div className="row">
           <ul className="nav nav-pills">
             <li className="active"><a href="#Information" data-toggle="tab">Information</a>
             </li>
             <li><a href="#InformationEng" data-toggle="tab">English Information</a>
             </li>
             <li><a href="#Stock" data-toggle="tab">Stock</a>
             </li>
           </ul>

           <hr/>

           <div className="tab-content">
             <div id="Information" className="tab-pane in active">
                <BasicInfo check={state.check}/>
             </div>

             <div id="InformationEng" className="tab-pane"
                style={{paddingBottom: 10}}>
                <BasicEngInfo
                  data={ob.data}
                  check={state.check}/>
             </div>
             <div id="Stock" className="tab-pane">
                <ProductStock
                  data={ob.data}
                  size_list={ob.size_list}
                  check={state.check}/>
             </div>
           </div>
         </div>

         <div className="row">
           <ProductImage
             data={ob.data}
             check={state.check}/>
         </div>

         <CompleteSection close={`/ProductManager`} save={this.onSave.bind(this)} />
      </div>
    );
  }
}

export default ProductInfo;
