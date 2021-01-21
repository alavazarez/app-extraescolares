<template>
  <v-container>
    <v-card class="mx-auto" color="primary">
      <v-container fluid>
        <v-row dense>
          <v-col cols="12" sm="6">
            <v-card-text>
              <p class="display-1 text--primary">Estudiantes Liberados</p>
              <div class="text--primary">
                <v-text-field v-model="countLiberados"> </v-text-field>
              </div>
            </v-card-text>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card-text>
              <p class="display-1 text--primary">Estudiantes Pendientes</p>
              <div class="text--primary">
                <v-text-field v-model="countLiberados"> </v-text-field>
              </div>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    countLiberados: 8,
  }),
};
</script>