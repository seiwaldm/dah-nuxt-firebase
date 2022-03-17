import { vuexfireMutations, firestoreAction } from 'vuexfire';

export const state = () => ({
  countDocument: {
    count: null,
  },
  gameCollection: {}
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
  bindCountDocument: firestoreAction(async function ({ bindFirestoreRef }) {
    const ref = this.$fire.firestore
      .collection('countCollection')
      .doc('countDocument');
    await bindFirestoreRef('countDocument', ref, { wait: true });
  }),
  unbindCountDocument: firestoreAction(function ({ unbindFirestoreRef }) {
    unbindFirestoreRef('countDocument', false);
  }),

  bindGameCollection: firestoreAction(async function ({ bindFirestoreRef }) {
    const ref = this.$fire.firestore
      .collection('games');
    await bindFirestoreRef('gameCollection', ref, { wait: true });
  }),
  unbindGameCollection: firestoreAction(function ({ unbindFirestoreRef }) {
    unbindFirestoreRef('gameCollection', false);
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
  count(state) {
    return state.countDocument.count;
  },
};
