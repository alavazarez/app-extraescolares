<template>
  <v-card>
    <v-card-title class="heading-2">
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
      <template v-slot:[`item.actions`]>
        <EditForm @submit="submit"/>
        <v-btn 
        @click="borrar"
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
  name: "List",
  components: { RegisterForm, EditForm },
  data: () => ({
    headers: [
      { text: "Id", value: "id" },
      { text: "Nombre", value: "name" },
      { text: "Fecha", value: "date" },
      { text: "Actions", value: "actions", sortable: false }
    ],
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
    ...mapActions('event',['getEvents']),
    borrar(){
      console.log('error');
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
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
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
