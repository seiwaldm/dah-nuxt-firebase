<template>
  <div>
    <p>Hello! To start a new game please enter your name:</p>
    <input type="text" />
    <button>Create New Game</button>
    <auth></auth>
  </div>
</template>

<script>
export default {
  // /**  DEMO - Bind Vuexfire on client-side */
  // fetch({ redirect }) {
  //   redirect('/spa-mode')
  // },
  async mounted() {
    try {
      await this.$store.dispatch("bindCountDocument");
      await this.$store.dispatch("bindGameCollection");
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style scoped>
auth {
  outline: 3px solid red;
}
</style>
