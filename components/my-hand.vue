<template>
  <div>
    <v-card
      v-for="(card, index) in hand"
      :key="card.text"
      @click="chooseCard(index)"
    >
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
  methods: {
    chooseCard(index) {
      this.$emit("chooseCard", index);
    },
  },
};
</script>

<style></style>
