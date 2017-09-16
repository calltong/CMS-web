import moment from 'moment';

export function toMoney(val) {
  let text = val.toFixed(2).toString();
  return text.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export function toNumber(val) {
  let text = val.toString();
  return text.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export function toText(val) {
  if (val === '' || val === undefined) {
    return '-';
  } else {
    return val;
  }
}

export function toDate(val) {
  if (val === '' || val === undefined) {
    return '-';
  } else {
    return moment(val).format('DD-MM-YYYY HH:mm');
  }
}

export function toOrderStatus(val) {
  switch (val) {
    case 'order':
      return 'สั่งซื้อสินค้า';
    case 'payment':
      return 'รอชำระเงิน';
    case 'working':
      return 'รอดำเนิดการ';
    case 'shipping':
      return 'จัดส่งสินค้า';
    case 'completed':
      return 'ลูกค้าได้รับสินค้า';
    case 'reject':
      return 'ยกเลิกคำสั่งซื้อ';
    default:
      return val;
  }
}
