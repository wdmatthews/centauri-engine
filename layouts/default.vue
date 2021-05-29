<template>
  <v-app>
    <v-navigation-drawer
      v-model="showNavigation"
      clipped
      app
    >
      <v-list>
        <v-list-item
          v-for="(link, i) in navigationLinks"
          :key="i"
          :to="link.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="link.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      app
    >
      <v-app-bar-nav-icon @click.stop="showNavigation = !showNavigation" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    showNavigation: null,
    navigationLinks: [
      {
        icon: 'mdi-home',
        title: 'Home',
        to: '/',
      },
      {
        icon: 'mdi-play',
        title: 'Play',
        to: '/play',
      },
    ],
    title: 'Centauri Engine',
  }),
}
</script>
