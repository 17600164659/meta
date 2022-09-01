import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

class toast {
  // constructor() { }

  success(text) {
    Toastify({
      text,
      duration: 3000,
      style: { background: "#52c41a" }
    }).showToast();
  }
  error(text) {
    Toastify({
      text,
      duration: 3000,
      style: { background: "#ff4d4f" }
    }).showToast();
  }
  info(text) {
    Toastify({
      text,
      duration: 3000
    }).showToast();
  }
}

export default new toast();
