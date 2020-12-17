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
          <v-row>
            <v-col cols="8">
              <v-text-field 
              v-model="form.name"
              label="Nombre*" 
              required
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
              v-model="form.type_event_id"
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
              v-model="form.place"
              label="Lugar*" 
              required>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field 
              v-model="form.organizer"
              label="Organizador*" 
              required>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-menu>
                <v-text-field 
                v-model="form.date"
                type="date"
                slot="activator"
                label="Fecha">
                </v-text-field>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6"> 
              <v-text-field 
              v-model="form.date"
              label="hora*" 
              required>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="form.description"
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
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="submit">
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
  name: "RegisterForm",
  data: () => ({
    dialog:false,
    form:{
      name:'',
      type_event_id:1,
      description:'',
      date:null,
      place:'',
      organizer:''
    },
    items: [
        {id:1, name:'Deportivo'},
        {id:2, name:'Cultural'},
        {id:3, name:'Cívico'},
      ],
    }),
    methods:{
      ...mapActions('event',['store','getEvents']),
      async submit(){
        try {
          await this.store(this.form)
          this.getEvents();
          this.cleanInputs();
          this.dialog = false
          
        } catch (error) {
          //
        }
      },
      cleanInputs(){
        this.form.name=''
        this.form.type_event_id=null
        this.form.description=''
        this.form.date=null
        this.form.place=''
        this.form.organizer=''
      }
    },
};
</script>
