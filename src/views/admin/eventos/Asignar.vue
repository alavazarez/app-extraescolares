<template>
  <v-card class="mx-auto" max-width="900">
    <v-card-title class="ma-0 title font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <v-avatar
        color="primary lighten-2"
        class="subheading white--text"
        size="24"
        v-text="step"
      ></v-avatar>
    </v-card-title>
    <v-window v-model="step">
      <v-window-item :value="1">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field type="date" value="as"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
      <v-window-item :value="2">
        <v-card-text>
          <v-text-field label="Password" type="password"></v-text-field>
          <v-text-field label="Confirm Password" type="password"></v-text-field>
          <span class="caption grey--text text--darken-1">
            Please enter a password for your account
          </span>
        </v-card-text>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn :disabled="step === 1" text @click="step--">
        Back
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="step === 3" color="primary" depressed @click="step++">
        Next
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Asignar",
  data: () => ({
    step: 1
  }),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Buscar evento";
        case 2:
          return "Create a password";
        default:
          return "Account created";
      }
    }
  }
};
</script>