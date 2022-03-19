<template>
  <div class="container">
    <div>
      <p>Hello! To start a new game please enter your name:</p>
      <input type="text" v-model="playerName" />
      <button @click="createGame">Create New Game</button>
    </div>
    <div class="auth"><auth></auth></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerName: "",
    };
  },
  // /**  DEMO - Bind Vuexfire on client-side */
  // fetch({ redirect }) {
  //   redirect('/spa-mode')
  // },
  async mounted() {
    try {
      await this.$store.dispatch("bindGameCollection");
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    async createGame() {
      const gameId = new Date().toISOString().replace(/[^0-9]/g, "");
      this.$fire.firestore
        .collection("games")
        .doc(gameId)
        .set({ creator: this.playerName });
    },
  },
};
</script>

<style scoped>
.container {
  display: grid;
  place-items: center;
}
</style>
