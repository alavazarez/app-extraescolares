<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Editar Evento</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="8">
              <v-text-field 
              v-model="value.name" 
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
              v-model="value.place"
              label="Lugar*" 
              required>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field 
              v-model="value.organizer"
              label="Organizador*" 
              required>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-menu>
                <v-text-field 
                v-model="value.date"
                type="date"
                slot="activator"
                label="Fecha">
                </v-text-field>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6"> 
              <v-text-field 
              v-model="value.date"
              label="hora*" 
              required>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="value.description"
                outlined
                label="Descripción"
                counter
                maxlength="120"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('closedialog')">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="submit" v-on:click="$emit('closedialog')">
          Save
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
    dialog: false,
    items: [
        {id:1, name:'Deportivo'},
        {id:2, name:'Cultural'},
        {id:3, name:'Cívico'},
      ],
    }),
    methods:{
      ...mapActions('event',['update']),

      async submit(){
        try {
          await this.update(this.value)
          //this.dialog = false
        } catch (error) {
        }
      },    
    },
  watch:{
    openDialog:function (){
      this.dialog = this.openDialog 
    }
  }
}
</script>
