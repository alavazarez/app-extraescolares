import Swal from 'sweetalert2';

export default {
    async confirm(title, text, confirmTextBtn, cancelTextBtn, icon){
        return new Promise((resolve, reject) => {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: true
              });
              
              swalWithBootstrapButtons.fire({
                title: title,
                text: text,
                icon: icon ? icon :'question',
                showCancelButton: true,
                confirmButtonText: confirmTextBtn? confirmTextBtn : 'Aceptar',
                cancelButtonText: cancelTextBtn ? cancelTextBtn : 'Cancelar',
                reverseButtons: false,
                focusConfirm: false,
              }).then((result) => {
                if (result.isConfirmed) {
                    resolve(result.isConfirmed);
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                    resolve(result.isConfirmed);
                }    
              })
        })
    },
     /**
     * Muestra un notificación tipo toast con un tiempo de duración
     * @param {string} [title] Titulo para el mensaje de toast
     * @param {number} [time] tiempo de duracion del toast - Deafult 3000
     * @param {string} [icon] icono que se mostrará en el toast - Default 'success'
     * @param {string} [position] posicion del toast - Default 'top-end'
     */
    async toast(title, time = 3000, icon= 'success', position = 'top-end') {
      const Toast = Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: time,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: icon,
        title: title
      })
    },

}