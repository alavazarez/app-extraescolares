<template>
  <div>
      <v-card-title>
            <v-row>
                <v-col md="4">
                    <v-text-field
                    type="date"
                    regular label="Fecha del evento">
                    </v-text-field>
                </v-col>
            </v-row>
        </v-card-title>
        <v-data-table
        v-model="selectedEvent"
        :headers="headersEvent"
        :items="events"
        single-select
        show-select
        />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name:'eventPicker',
    props: {
        value:{
            type:Number,
            required:true,
        }
    },
    data (){
        return {
            selectedEvent:[],
            headersEvent: [
                { text: 'Nombre', value: 'name' },
                { text: 'Tipo de evento', value: 'type_event_id' },
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
    },
    watch:{
      selectedEvent: function (){
        this.inputValue = this.selectedEvent[0].id;
      }
    }
}
</script>

<style>

</style>