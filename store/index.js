import { vuexfireMutations, firestoreAction } from 'vuexfire';

export const state = () => ({
  gameCollection: null,
  userCollection: null
});
export const mutations = {
  ...vuexfireMutations,

  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    // Do this:
    if (!authUser) {
      // claims = null
      // perform logout operations
    }
    else {
      const { uid, email, emailVerified, displayName } = authUser;
      state.user = { uid, email, emailVerified, displayName };
    }
  }
};

export const actions = {

  bindGameCollection: firestoreAction(async function ({ bindFirestoreRef }) {
    const ref = this.$fire.firestore
      .collection('games');
    await bindFirestoreRef('gameCollection', ref, { wait: true });
  }),
  unbindGameCollection: firestoreAction(function ({ unbindFirestoreRef }) {
    unbindFirestoreRef('gameCollection', false);
  }),
  bindUserCollection: firestoreAction(async function ({ bindFirestoreRef }) {
    const ref = this.$fire.firestore
      .collection('users');
    await bindFirestoreRef('userCollection', ref, { wait: true });
  }),
  unbindUserCollection: firestoreAction(function ({ unbindFirestoreRef }) {
    unbindFirestoreRef('userCollection', false);
  }),

  onAuthStateChangedAction: (ctx, { authUser, claims }) => {
    if (!authUser) {
      // claims = null
      // Perform logout operations
    } else {
      ctx.commit("ON_AUTH_STATE_CHANGED_MUTATION", { authUser, claims });
    }
  }

};
export const getters = {
};
