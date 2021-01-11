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
      { text: "Nombre", value: "nameEvent" },
      { text: "Tipo de evento", value: "type" },
      { text: "Organizador", value: "organizer" },
      { text: "Fecha", value: "date" },
      { text: "Lugar", value: "place" },
      { text: "Descripcion", value: "description" },
    ],
  }),
  computed:{
    ...mapGetters({
      events: 'event/events',
    })
  },
  mounted(){
    this.getEventsForStudents();
  },
  methods:{
    ...mapActions('event',['getEventsForStudents']),
  }
};
</script>
