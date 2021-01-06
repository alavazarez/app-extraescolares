<template>
  <v-card>
    <v-card-title class="heading-2">
      Proximos Eventos
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="events"
      sort-by="calories"
      class="elevation-1"
    ></v-data-table>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "UpcomingEvents",
  data: () => ({
    headers: [
      { text: "Id", value: "id" },
      { text: "Nombre", value: "name" },
      { text: "Tipo de evento", value: "type_event_id" },
      { text: "Organizador", value: "organizer" },
      { text: "Fecha", value: "date" },
      { text: "Lugar", value: "place" },
      { text: "Actions", value: "actions", sortable: false }
    ],
  }),
  computed:{
    ...mapGetters({
      events: 'event/events',
    })
  },
  mounted(){
    this.getEvents();
  },
  methods:{
    ...mapActions('event',['getEvents']),
  }
};
</script>
