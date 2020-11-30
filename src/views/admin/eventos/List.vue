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
        <v-btn x-small fab color="error" dark>
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
    submit(){
      try {
        let response = 0;
      } catch (error) {
        
      }
    },
  },
};
</script>
