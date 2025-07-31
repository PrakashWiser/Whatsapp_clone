import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

const alert = {
  success: (message = "Success") => {
    Toast.fire({
      icon: "success",
      title: message,
    });
  },

  error: (message = "Something went wrong") => {
    Toast.fire({
      icon: "error",
      title: message,
    });
  },

  info: (message = "") => {
    Toast.fire({
      icon: "info",
      title: message,
    });
  },

  warning: (message = "") => {
    Toast.fire({
      icon: "warning",
      title: message,
    });
  },
};

export default alert;
