<template>
  <div class="container">
    <div>
      <p>Hello! To start a new game please enter your name:</p>
      <input type="text" v-model="playerName" />
      <button @click="createGame">Create New Game</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerName: "",
    };
  },

  // async mounted() {
  //   try {
  //     await this.$store.dispatch("bindGameCollection");
  //     await this.$store.dispatch("bindUserCollection");
  //   } catch (e) {
  //     console.error(e);
  //   }
  // },

  methods: {
    async createGame() {
      const res = await this.$fire.auth.signInAnonymously();
      const uid = res.user.uid;
      this.$fire.firestore
        .collection("users")
        .doc(uid)
        .set({ name: this.playerName });

      const gameId = Math.floor(Date.now() * Math.random()).toString(36);
      this.$fire.firestore
        .collection("games")
        .doc(gameId)
        .set({ creator: uid });

      this.$router.push("/" + gameId);
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
