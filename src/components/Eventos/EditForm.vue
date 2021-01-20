<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Editar Evento</span>
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
              :rules="nameRules"
              v-model="value.nameEvent" 
              label="Nombre*" 
              required>
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
              v-model="value.type_event_id"
              :items="items"
              label="Tipo de evento"
              item-text="name"
              item-value="id"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field 
              :rules="placeRules"
              v-model="value.place"
              label="Lugar*" 
              required>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field 
              :rules="OrganizatorRules"
              v-model="value.organizer"
              label="Organizador*" 
              required>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
                <v-text-field
                :rules="dateRules" 
                v-model="value.date"
                label="Fecha y hora*"
                required>
                </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
              :rules="descriptionRules"
                v-model="value.description"
                outlined
                label="Descripción"
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
        <v-btn color="blue darken-1" text @click="$emit('closedialog')">
          Cancelar
        </v-btn>
        <v-btn color="blue darken-1" :disabled="!valid" text @click="submit" v-on:click="$emit('closedialog')">
          Actualizar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Event from '../../api/Event'
import { mapActions } from 'vuex'

export default {
  name: "EditForm",
  props:{
    value:{
      type:Object,
      required:true,
    },
    openDialog:{
      type:Boolean
    }
  },
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
    items: [
        {id:1, name:'Deportivo'},
        {id:2, name:'Cultural'},
        {id:3, name:'Cívico'},
      ],
    }),
    methods:{
      ...mapActions('event',['update', 'getEvents']),

      async submit(){
      if(this.$refs.form.validate() == true)
        {
          try {
            await this.update(this.value)
            this.getEvents()
            //this.dialog = false
          }catch (error) {
          }
        }
      }   
    },
  watch:{
    openDialog:function (){
      this.dialog = this.openDialog 
    }
  }
}
</script>
