<template>
  <div>
      <v-card-title>
            <v-row>
                <v-col md="4">
                    <v-text-field
                    v-model="date"
                    type="date"
                    regular label="Fecha del evento">
                    </v-text-field>
                </v-col>
                <v-col> 
                    <v-btn @click="date=null" color="primary"> Limpiar fecha </v-btn>
                </v-col>
            </v-row>
        </v-card-title>
        <v-data-table
        v-model="selectedEvent"
        :headers="headersEvent"
        :items="events"
        single-select
        show-select
        :search="date"
        >
            <template v-slot:item.date="{ item }">
                {{ formatDate(item.date) }}
            </template>
        </v-data-table>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapGetters } from 'vuex'
export default {
    name:'eventPicker',
    props: {
        value:{
            type:Object,
            required:true,
        },
        
    },
    data (){
        return {
            selectedEvent:[],
            date:null,
            headersEvent: [
                { text: 'Nombre', value: 'nameEvent' },
                { text: 'Tipo de evento', value: 'type' },
                { text: 'Organizador', value: 'organizer' },
                { text: 'Lugar', value: 'place' },
                { text: 'Fecha', value: 'date' },
            ],
        }
    },
    mounted (){
        this.getEvents();
    },
    computed:{
        ...mapGetters ({
            events: 'event/events',
        }),
        inputValue: {
            get(){
                return this.value;
            },
            set(val){
                this.$emit('input',val)
            }
        }
    },
    methods:{
        ...mapActions('event',['getEvents']),
        formatDate(value) 
        {
            return moment(value).format('DD/MM/YYYY HH:mm')
        },
    },
    watch:{
        selectedEvent: function (){
            if(this.selectedEvent.length > 0){
                this.inputValue = {id:0};
                setTimeout(() => { 
                    this.inputValue = this.selectedEvent[0]; 
                }, .0001);
            }else{
                this.inputValue = {id:0 , nameEvent: ""};
            }
        }
    }
}
</script>

<style>

</style>