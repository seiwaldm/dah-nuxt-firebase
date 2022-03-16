import { vuexfireMutations, firestoreAction } from 'vuexfire'

export const state = () => ({
  countDocument: {
    count: null,
  },
})
export const mutations = {
  ...vuexfireMutations,
}

export const actions = {
  bindCountDocument: firestoreAction(async function ({ bindFirestoreRef }) {
    const ref = this.$fire.firestore
      .collection('countCollection')
      .doc('countDocument')
    await bindFirestoreRef('countDocument', ref, { wait: true })
  }),
  unbindCountDocument: firestoreAction(function ({ unbindFirestoreRef }) {
    unbindFirestoreRef('countDocument', false)
  }),
}
export const getters = {
  count(state) {
    return state.countDocument.count
  },
}
