<template>
  <v-container>
    <v-card>
      <v-card-title class="heading-2">
        <EditForm
          @closedialog="closedialog"
          :openDialog="openDialog"
          :value="itemSelected"
        />
        <v-row>
          <v-col cols="10">
            Eventos Extraescolares
            <v-spacer></v-spacer>
          </v-col>
          <v-col class="d-flex" cols="3" sm="3">
            <v-select
              :items="items"
              label="Filtrar"
              item-text="name"
              item-value="id"
              v-model="idFiltro"
              @change="filtrar"
              dense
              outlined
            ></v-select>
          </v-col>
        </v-row>
          <RegisterForm @submit="submit" />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="events"
        sort-by="calories"
        class="elevation-1">
      <template v-slot:item.status="{ item }">
            <v-chip
              :color="getColor(item.status, item.date)"
              dark
              pill>
            <v-avatar v-if="item.status == 0">
        <v-icon>mdi-check</v-icon>
      </v-avatar>
      <v-avatar v-if="item.status == 1">
        <v-icon>mdi-close</v-icon>
      </v-avatar>
      <!--
      <v-avatar v-if="item.status == 0">
                  <v-icon>mdi-eye</v-icon>
                </v-avatar>
            {{ item.status }}-->
            </v-chip>
        </template>
      <template v-slot:item.date="{ item }">
      {{ formatDate(item.date) }}
    </template>
        <template v-slot:item.actions="{ item }">
          <v-btn @click="verAlumnos(item)" x-small fab color="success" dark>
            <v-icon dark>mdi-eye</v-icon>
          </v-btn>
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
          <v-btn @click="borrar(item)" x-small fab color="error" dark>
            <v-icon dark>mdi-trash-can</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-row justify="end">
      <v-col cols="12" sm="12" md="5">
        <v-card elevation="5">
          <v-card-title> Significado de los colores </v-card-title>
          <v-card-text >
            <div justify="center" align="center">
              <v-chip
                class="ma-2"
                color="green"
                text-color="white"
                pill>
                  <v-icon>mdi-check</v-icon>
                    ACTIVO
              </v-chip>
              <v-chip
                class="ma-2"
                color="red"
                text-color="white"
                pill>
                  <v-icon>mdi-close</v-icon>
                    CANCELADO
              </v-chip>
              <v-chip
                class="ma-2"
                color="blue"
                text-color="white"
                pill>
                  <v-icon>mdi-check</v-icon>
                    REALIZADO
              </v-chip>
              </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
import RegisterForm from "@/components/Eventos/RegisterForm";
import EditForm from "@/components/Eventos/EditForm";
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
  components: { RegisterForm, EditForm },
  data: () => ({
    headers: [
      { text: "Estatus", value: "status" },
      { text: "Nombre", value: "nameEvent" },
      { text: "Tipo de evento", value: "type" },
      { text: "Organizador", value: "organizer" },
      { text: "Fecha", value: "date" },
      { text: "Lugar", value: "place" },
      { text: "Descripción", value: "description" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    items: [
      { id: 0, name: "Todos los eventos" },
      { id: 1, name: "Eventos realizados" },
      { id: 2, name: "Eventos Proximos" },
    ],
    idFiltro: 0,
    itemSelected: {},
    openDialog: false,
    dateSystem:0
  }),
  mounted() {
    this.getEvents();
  },
  computed: {
    ...mapGetters({
      events: "event/events",
    }),
  },
  methods: {
    ...mapActions("event", ["getEvents", "destroy", "filtrosEventos", "validarEvent"]),
     getColor(status, date) {
       var dateActual = new Date();
       var dateItems = new Date(date);
       if(status == 1) return "red"

       if(status == 0 && dateItems < dateActual) return "blue"

       if(status == 0 && dateItems >= dateActual) return "green"
       
      },
    formatDate(value) {
      return moment(value).format('DD/MM/YYYY HH:mm:ss')
  },
    closedialog: function () {
      this.openDialog = false;
    },
    async filtrar() {
      try {
        await this.filtrosEventos(this.idFiltro);
      } catch (error) {}
    },
    verAlumnos(item)
    {
      const idItem = item.id
      this.$router.push({ name: "Asistencias", params: { idItem } });
    },
    selectingItem(item) {
      this.openDialog = true;
      this.itemSelected = item;
    },
    async borrar(item) {
      let response = await this.validarEvent(item.id)
      Swal.fire({
        title: "¿Estas seguro de borrar este evento?",
        text: "Ya no podras revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI, eliminar evento",
        cancelButtonText: "NO, cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          if(response.data == true)
          {
            Swal.fire({
            icon: "error",
            title: "¡Imposible eliminar!",
            text: "Este evento extraescolar ya cuenta con asistencias",
            showConfirmButton: false,
            timer: 2500
          });
          }
          else
          {
              this.destroy(item)
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: "Eliminado!",
                text:"El evento seleccionado ha sido eliminado",
                showConfirmButton: false,
                timer: 2500  
                });
              this.getEvents();
            })
            .catch((err) => {
              Swal.fire("Error!", "No pudo ser eliminado", "error");
            });
          }
        }
      });
    },
    submit() {
      try {
        let response = 0;
      } catch (error) {}
    },
  },
};
</script>
