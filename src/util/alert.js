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
    }
}