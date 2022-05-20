<template>
  <v-container class="game-screen">
    <user-login v-if="!isLoggedIn" @login="addPlayer"></user-login>

    <div class="game-lobby" v-if="!gameStarted">
      <player-list
        v-if="game && isLoggedIn"
        :players="game.players"
      ></player-list>

      <v-btn v-if="canStart" @click="startGame">Start Game</v-btn>
    </div>
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
      gameStarted: false,
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
      this.gameStarted = true;

      //make heap

      //deal cards

      //determine start player/master
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
