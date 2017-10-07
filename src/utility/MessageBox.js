import swal from 'sweetalert';

class MessageBox {
  Display(message, option={time:4000, confirm: true}) {
    swal({
      title: '',
      text: message,
      timer: option.time,
      showConfirmButton: option.confirm,
    });
  }

  DisplayConfirm(text, callback) {
    swal({
      title: '',
      text: text,
      buttons: {
        cancel: true,
        confirm: true,
      },
    }).then((value) => {
      callback(value);
    });
  }
}

export const box = new MessageBox();
