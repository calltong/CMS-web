//import {facebook} from './Facebook';
import $ from 'jquery';
import shortid from 'shortid';
import swal from 'sweetalert';

class Manager {
  DisplayPanel(id) {
    $(id).modal('show');
  }

  ClosePanel(id) {
    $(id).modal('hide');
  }

  TogglePanel(id) {
    $(id).modal('toggle');
  }

  DisplayMenu(id) {
    $(id).collapse('show');
  }

  CloseMenu(id) {
    $(id).collapse('hide');
  }

  ToggleMenu(id) {
    $(id).collapse('toggle');
  }

  GetWidth() {
    return $(window).width();
  }

  GetHeight() {
    return $(window).height();
  }

  SetOnTop() {
    $(document.body).scrollTop(0);
  }

  GenerateId() {
    return shortid.generate();
  }

  MessageNotify(message) {
    swal({
      title: '',
      text: message,
    });
  }

  MessageErrorNotify(message) {
    swal({
      title: '',
      text: message,
    });
  }
}

export const manager = new Manager();
