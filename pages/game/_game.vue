<template>
  <v-container class="game-screen" v-if="game">
    <user-login v-if="!isLoggedIn" @login="addPlayer"></user-login>

    <div class="game-lobby" v-if="!game.gameStarted">
      <player-list
        v-if="game && isLoggedIn"
        :players="game.players"
      ></player-list>

      <v-btn v-if="canStart" @click="startGame">Start Game</v-btn>
    </div>

    <v-btn @click="startGame">Debug game start</v-btn>
    <div class="runningGame" v-if="game.gameStarted"></div>
  </v-container>
</template>

<script>
import userLogin from "../../components/user-login.vue";
export default {
  components: { userLogin },
  data() {
    return {
      game: null,
      gameRef: null,
      isLoggedIn: false,
    };
  },

  computed: {
    canStart() {
      if (this.game && this.$fire.auth.currentUser) {
        if (this.game.players.length > 2)
          return this.$fire.auth.currentUser.uid === this.game.creator;
      }
      return false;
    },
  },

  async mounted() {
    // set reference to game-document:
    const ref = this.$fire.firestore
      .collection("games")
      .doc(this.$route.params.game);

    // save ref locally for future firebase-actions
    this.gameRef = ref;

    // subscribe to changes in the game-doc:
    ref.onSnapshot((doc) => {
      this.game = doc.data();
    });

    //keep checking if user is logged in:
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.isLoggedIn = true;
        console.log(user);
      }
    });

    await this.$store.dispatch("bindDecks");
  },

  methods: {
    async addPlayer(playerName) {
      //adding player to users collection:
      const res = await this.$fire.auth.signInAnonymously();
      const uid = res.user.uid;
      this.$fire.firestore
        .collection("users")
        .doc(uid)
        .set({ name: playerName });

      //adding player to current game:
      this.gameRef.update({
        players: this.$fireModule.firestore.FieldValue.arrayUnion({
          name: playerName,
          id: uid,
          points: 0,
          hand: [],
        }),
      });
    },

    async startGame() {
      await this.gameRef.update({
        gameStarted: true,
      });

      //make heap:
      await this.makeHeap();

      //deal cards
      await this.dealCards();

      //determine start player/master
      await this.gameRef.update({
        cardMaster: 0,
      });
    },

    async makeHeap() {
      const allDecks = this.$store.state.decks;
      const blackPile = [];
      const whitePile = [];
      const ourDecks = allDecks.filter((deck) =>
        this.game.deckNames.includes(deck.name)
      );
      ourDecks.forEach((deck) => {
        deck.black.forEach((card) => blackPile.push(card));
        deck.white.forEach((card) => whitePile.push(card));
      });

      await this.gameRef.update({
        blackPile: blackPile,
        whitePile: whitePile,
      });
    },

    async dealCards() {
      this.game.players.forEach((player) => {
        while (player.hand.length < 10) {
          const cardNumber = Math.floor(
            Math.random() * this.game.whitePile.length
          );
          player.hand.push(this.game.whitePile[cardNumber]);
        }
      });

      await this.gameRef.update({
        players: this.game.players,
      });
    },
  },
};
</script>

<style scoped>
.game-screen {
  display: grid;
  min-height: 100vh;
  place-items: center;
  align-content: center;
  gap: 20px;
}

.game-lobby {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
