<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm12 md10 offset-md1>
        <v-card>
          <v-container fluid>
            <v-layout row>
              <v-card-title>
                <div>
                  <h6>{{ abstract.reviewSubspecialty }}</h6>
                  <h4 class="primary--text">{{ abstract.title }}</h4>
                  <div>First Author: {{ abstract.authors[0].displayName }}</div>
                  <div v-if="hasOtherAuthor">Co-Author(s): {{ otherAuthorNames }}</div>
                  <div v-if="hasPurpose">
                    <h5 class="primary--text mt-4">Purpose :</h5>
                    <div v-html="abstract.purpose.join('<br/>>')"></div>
                  </div>
                  <div v-if="hasMethods">
                    <h5 class="primary--text mt-4">Methods :</h5>
                    <div v-html="abstract.methods.join('<br/>>')"></div>
                  </div>
                  <div v-if="hasResults">
                    <h5 class="primary--text mt-4">Results :</h5>
                    <div v-html="abstract.results.join('</br>')"></div>
                  </div>
                  <div v-if="hasConclusions">
                    <h5 class="primary--text mt-4">Conclusions :</h5>
                    <div v-html="abstract.conclusions.join('</br>')"></div>
                  </div>

                </div>
              </v-card-title>
            </v-layout>

            <v-layout v-if="hasFiles" row>
              <v-card-actions>
                <v-btn :href="file.src" target="_blank">
                  <v-icon left light>arrow_forward</v-icon>
                  {{ file.hint }}
                </v-btn>
                <v-btn icon :class="likeClass" @click="change()">
                  <v-icon>thumb_up</v-icon>
                </v-btn>
              </v-card-actions>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    abstract() {
      return this.$store.getters.loadedAbstract(this.id)
    },
    hasOtherAuthor() {
      return this.abstract.authors.length > 1
    },
    hasPurpose() {
      return this.abstract.purpose.length > 0
    },
    hasMethods() {
      return this.abstract.methods.length > 0
    },
    hasResults() {
      return this.abstract.results.length > 0
    },
    hasConclusions() {
      return this.abstract.conclusions.length > 0
    },
    hasFiles() {
      return this.abstract.files.length > 0
    },
    file() {
      let file = this.abstract.files[0]
      let src = `http://congress.asiateleophth.org/${file.src.substring(7)}`
      let hint = 'Open PDF'
      if (file.fullFilename.indexOf('mp4') !== -1) {
        hint = 'Open Video'
      }

      return {
        src: src,
        hint: hint
      }
    },
    otherAuthorNames() {
      return this.abstract.authors.slice(1).sort((authorA, authorB) => {
        if (authorA.lastName === authorB.lastName) {
          return authorA.firstName > authorB.firstName ? 1 : -1
        }
        return authorA.lastName > authorB.lastName ? 1 : -1
      }).map(author => {
        return author.displayName
      }).join(', ')
    }
  },
  data() {
    return {
      like: false,
      likeClass: 'deep-grey--text'
    }
  },
  methods: {
    change() {
      if (!this.$store.state.loginState.isLogin) {
        this.$router.push('/login')
      } else {
        this.like = !this.like
        if (this.like === true) {
          this.likeClass = 'deep-orange--text'
        } else {
          this.likeClass = 'deep-grey--text'
        }
      }
    }
  }
}
</script>
<style>

</style>
