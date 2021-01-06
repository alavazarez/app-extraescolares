<template>
  <v-card>
    <v-card-title class="heading-2">
      <EditForm
      @closedialog="closedialog"
      :openDialog="openDialog"
      :value="itemSelected"
      />
      Eventos
      <v-spacer></v-spacer>
      <RegisterForm @submit="submit"/>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="events"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn
        x-small
        class="mx-3"
        fab
        color="primary"
        dark
        @click="selectingItem(item)"
        
      >
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>
        <v-btn 
        @click="borrar(item)"
        x-small 
        fab 
        color="error" 
        dark>
          <v-icon dark>mdi-trash-can</v-icon></v-btn
        >
      </template>
    </v-data-table>
  </v-card>

  
</template>

<script>
import RegisterForm from "@/components/Eventos/RegisterForm";
import EditForm from "@/components/Eventos/EditForm";
import { mapActions, mapGetters } from 'vuex';
import Event from '../../../api/Event'
import Swal from 'sweetalert2'

export default {
  components: { RegisterForm, EditForm },
  data: () => ({
    headers: [
      { text: "Id", value: "id" },
      { text: "Nombre", value: "nameEvent" },
      { text: "Tipo de evento", value: "type_event_id" },
      { text: "Organizador", value: "organizer" },
      { text: "Fecha", value: "date" },
      { text: "Lugar", value: "place" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    itemSelected:{},
    openDialog:false,
  }),
  mounted(){
    this.getEvents();
  },
  computed:{
    ...mapGetters({
      events: 'event/events',
    })
  },
  methods:{
    ...mapActions('event',['getEvents','destroy']),

    closedialog: function(){
      console.log('closing')
      this.openDialog = false;
    },
    selectingItem(item){
      this.openDialog = true;
      this.itemSelected = item;
    },
    borrar(item){
      console.log(item)
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.destroy(item)
          .then((res)=>{
            Swal.fire(
            'Eliminado!',
            'El campo seleccionado ha sido eliminado',
            'success'
          )
          this.getEvents();
          })
          .catch((err)=>{
            Swal.fire(
            'Error!',
            'No pudo ser eliminado',
            'error'
          )
          })
        }
      })
    },
    submit(){
      try {
        let response = 0;
      } catch (error) {
        
      }
    },
  },
};
</script>
