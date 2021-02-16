<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mx-3" fab color="primary" dark v-bind="attrs" v-on="on">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Nuevo evento</span>
      </v-card-title>
      <v-card-text>
        <v-container>
           <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
          <v-row>
            <v-col cols="8">
              <v-text-field 
              required
              :rules="nameRules"
              v-model="form.nameEvent" 
              label="Nombre*">
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="form.type_event_id"
                :items="items"
                label="Tipo de evento*"
                item-text="name"
                item-value="id"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field 
              :rules="placeRules"
              v-model="form.place" 
              label="Lugar*" 
              required>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                :rules="OrganizatorRules"
                v-model="form.organizer"
                label="Organizador*"
                required
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-menu>
                <v-text-field
                  :rules="dateRules"
                  v-model="form.date"
                  type="datetime-local"
                  slot="activator"
                  label="Fecha y hora*">
                </v-text-field>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                :rules="descriptionRules"
                v-model="form.description"
                outlined
                label="Descripción*"
                counter
                maxlength="100"
              ></v-textarea>
            </v-col>
          </v-row>
          </v-form>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="clouse()">
          Cancelar
        </v-btn>
        <v-overlay v-model="overlay">
          <v-progress-circular
            color="primary"
            indeterminate
            size="64"
          ></v-progress-circular>
        </v-overlay>
        <v-btn color="blue darken-1" 
          :disabled="!valid"
          text @click="submit"> Guardar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Swal from "sweetalert2";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "RegisterForm",
  data: () => ({
    valid: true,
    nameRules: [
        v => !!v || 'Nombre del evento es requerido',
      ],
    placeRules: [
        v => !!v || 'El lugar del evento es requerido',
      ],
    OrganizatorRules: [
        v => !!v || 'El organizador del evento es requerido',
      ],
    dateRules: [
        v => !!v || 'La fecha del evento es requerido',
      ],
    descriptionRules: [
        v => !!v || 'La descripción del evento es requerido',
      ],
    dialog: false,
    form: {
      nameEvent: "",
      type_event_id: 1,
      description: "",
      date: null,
      place: "",
      organizer: "",
      status:0
    },
    items: [
      { id: 1, name: "Deportivo" },
      { id: 2, name: "Cultural" },
      { id: 3, name: "Cívico" },
    ],
  }),
  computed: {
    ...mapGetters({
      overlay: "event/overlay",
    }),
  },
  methods: {
    ...mapActions("event", ["store", "getEvents"]),
    async submit() {
      if(this.$refs.form.validate() == true)
      {
      try {
        await this.store(this.form);
        Swal.fire({
              icon: "success",
              title: "Evento creado",
              text: "Se ha creado un nuevo evento",
              showConfirmButton: false,
              timer: 2500
              })
        this.getEvents();
        this.$refs.form.reset()
        this.cleanInputs();
        this.dialog = false;
      } catch (error) {
      }
      }
    },
    clouse(){
      this.$refs.form.reset()
      this.cleanInputs();
      this.dialog=false
    },
    cleanInputs() {
      this.form.nameEvent = "";
      this.form.type_event_id = null;
      this.form.description = "";
      this.form.date = null;
      this.form.place = "";
      this.form.organizer = "";
    },
  },
};
</script>
