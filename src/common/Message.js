
class MsgThai {
  constructor() {
    this.title = {
      confirm: 'คุณแน่ใจ ใช่มัยค่ะ?',
      warning: 'ข้ออภัยนะค่ะ',
      success: 'ทำงานเสร็จเรียบร้อย',
      error: 'เกิดข้อผิดพลาด'
    }

    this.confirm = {
      remove: 'เมื่อลบข้อมูลแล้วไม่สามารถนำกลับมาได้นะค่ะ!'
    }

    this.warning = {
      duplicate: 'ข้อมูลที่ท่านเลือกมีอยู่แล้ว'
    }

    this.error = {
      retry: 'กรุณาลองใหม่อีกครั้งนะค่ะ'
    }
  }
}


const MessageThai = new MsgThai();
export default MessageThai;
