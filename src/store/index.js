import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedAbstracts: []
  },
  mutations: {
    fetchAbstracts(state, abstracts) {
      state.loadedAbstracts = abstracts
    }
  },
  getters: {
    loadedAbstracts(state) {
      return state.loadedAbstracts.filter(abstract => {
        return abstract.finalPresentation.toLowerCase() !== 'free paper'
      }).sort((abstractA, abstractB) => {
        if (abstractA.reviewSubspecialty.toLowerCase() === abstractB.reviewSubspecialty.toLowerCase()) {
          return abstractA.title > abstractB.title ? 1 : -1
        }
        return abstractA.reviewSubspecialty > abstractB.reviewSubspecialty ? 1 : -1
      })
    },
    loadedAbstract(state) {
      return (abstractId) => {
        return state.loadedAbstracts.find(abstract => {
          return abstract.id === abstractId
        })
      }
    },
    featuredAbstracts(state, getters) {
      return getters.loadedAbstracts.slice(0, 5)
    },
    loadedAbstractsByPresentation(state, getters) {
      return (presentation) => {
        if (presentation && presentation !== 'all') {
          return getters.loadedAbstracts.filter(abstract => {
            return abstract.finalPresentation.toLowerCase() === presentation.toLowerCase()
          })
        } else {
          return getters.loadedAbstracts
        }
      }
    }
  },
  actions: {
    fetchAbstracts({ commit }) {
      Vue.http.get('http://congress.asiateleophth.org/mobile/abstract?eventShortCode=aptos2017')
        .then(response => {
          commit('fetchAbstracts', response.body)
        })
    }
  }
})
