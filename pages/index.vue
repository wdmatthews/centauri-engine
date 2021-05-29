<template>
  <div style="font-size: 0">
    <v-btn
      color="primary"
      elevation="2"
    >
      Primary
    </v-btn>
    <v-btn
      class="ml-4"
      color="secondary"
      elevation="2"
    >
      Secondary
    </v-btn>
    <v-btn
      class="ml-4"
      color="accent"
      elevation="2"
    >
      Accent
    </v-btn>
    <v-alert
      class="mt-4"
      color="info"
    >
      Info
    </v-alert>
    <v-alert
      color="success"
    >
      Success
    </v-alert>
    <v-alert
      color="warning"
    >
      Warning
    </v-alert>
    <v-alert
      color="error"
    >
      Error
    </v-alert>
  </div>
</template>

<script>
export default {
  head: () => ({
    title: 'Home',
  }),
}
</script>
