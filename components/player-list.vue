<template>
  <v-card class="mx-auto" max-width="400" tile>
    <v-card-title>Angemeldete Spieler:</v-card-title>
    <v-list-item v-for="player in players" :key="player.id">
      <v-list-item-content>
        <v-list-item-title>{{ player.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: {
    players: Array,
  },
};
</script>

<style></style>
