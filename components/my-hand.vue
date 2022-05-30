<template>
  <div>
    <v-card v-for="card in hand" :key="card.text">
      <v-card-text>{{ card.text }}</v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    hand: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
