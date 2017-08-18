<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm12 md10 offset-md1>
        <v-toolbar class="white">
          <v-text-field prepend-icon="search" hide-details single-line v-model="searchText"></v-text-field>
        </v-toolbar>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-for="(abstract,index) in abstracts" :key="abstract.id">
      <v-flex xs12 sm12 md10 offset-md1 class="mt-4" v-if="hasSectionHeader(index)">
        <h5>{{ abstract.reviewSubspecialty }}</h5>
      </v-flex>
      <v-flex xs12 sm12 md10 offset-md1>
        <v-card>
          <v-container fluid>
            <v-layout row>
              <h5 class="primary--text" v-html="abstract.title"></h5>
            </v-layout>
            <v-layout row>
              <v-card-actions>
  
                <v-btn flat :to="`/abstracts/${abstract.id}`">
                  <v-icon left light >arrow_forward</v-icon>View Abstract</v-btn>
              </v-card-actions>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
  props: ['presentation'],

  methods: {
    hasSectionHeader(index) {
      return index === 0 || this.abstracts[index - 1].reviewSubspecialty !== this.abstracts[index].reviewSubspecialty
    }
  },
  data() {
    return {
      searchText: ''
    }
  },
  computed: {
    ...mapGetters({
      loadedAbstractsByPresentation: 'loadedAbstractsByPresentation'
    }),
    abstracts() {
      let abstracts = this.loadedAbstractsByPresentation(this.presentation)

      if (!this.searchText) {
        return abstracts
      }

      let matchedAbstracts = abstracts.reduce((abstracts, abstract) => {
        let reg = new RegExp(this.searchText, 'i')
        let matchs = abstract.title.match(reg)
        if (matchs) {
          let abstractCopy = JSON.parse(JSON.stringify(abstract))
          abstractCopy.title = abstractCopy.title.replace(reg, '<span class="secondary">' + matchs[0] + '</span>')
          return abstracts.concat(abstractCopy)
        }
        return abstracts
      }, [])
      return matchedAbstracts
    }
  }
}
</script>


<style scoped>

</style>
