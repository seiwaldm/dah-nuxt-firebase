<template>
  <div>
    <p>Game-Data: {{ game }}</p>
    <br />
    <p>Path/ID: {{ $route.path }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      game: null,
    };
  },

  async mounted() {
    // set reference to document:
    const ref = this.$fire.firestore
      .collection("games")
      .doc(this.$route.params.game);

    // subscribe to changes:
    ref.onSnapshot((doc) => {
      this.game = doc.data();
    });
  },
};
</script>
