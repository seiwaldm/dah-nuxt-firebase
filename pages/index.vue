<template>
  <div class="container">
    <div>
      <v-card>
        <v-card-title
          >Hello! To start a new game please enter your name:</v-card-title
        >
        <v-card-text>
          <v-text-field label="Name" v-model="playerName"></v-text-field>
          <v-select
            v-model="chosenDecks"
            :items="deckNames"
            label="Decks"
            multiple
            chips
            deletable-chips
            clearable
            hint="Choose your decks!"
            persistent-hint
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="createGame">Create New Game</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerName: "",
      chosenDecks: [],
    };
  },

  computed: {
    deckNames() {
      if (this.$store.state.decks !== null)
        return this.$store.state.decks.map((deck) => deck.name);
      return [];
    },
  },

  // async mounted() {
  //   try {
  //     await this.$store.dispatch("bindGameCollection");
  //     await this.$store.dispatch("bindUserCollection");
  //   } catch (e) {
  //     console.error(e);
  //   }
  // },

  async mounted() {
    // this.$fire.firestore
    //   .collection("decks")
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       this.decks.push(doc.data());
    //     });
    //   });
    await this.$store.dispatch("bindDecks");
  },

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
        .set({
          creator: uid,
          deckNames: this.chosenDecks,
          gameStarted: false,
          players: [
            {
              name: this.playerName,
              id: uid,
              points: 0,
              hand: [],
            },
          ],
        });

      this.$router.push("/game/" + gameId);
    },
  },
};
</script>

<style scoped>
.container {
  display: grid;
  place-items: center;
  min-height: 100vh;
}
</style>
