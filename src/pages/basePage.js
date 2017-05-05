import { Component } from 'react';
import {store} from '../store';

export class BasePage extends Component {
  componentWillMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
}
