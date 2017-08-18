<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm12 class="text-xs-center text-sm-center">
        <v-btn large class="info">Explore Abstracts</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row class="mt-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-carousel>
          <v-carousel-item v-for="abstract in abstracts" src="" :key="abstract.title">
            <div class="pa-5">
              <h4 class="primary--text">{{abstract.reviewSubspecialty}}</h4>
              <h5>{{abstract.title}}</h5>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 sm12 class="text-xs-center">
        <p>Explore our awesome abstracts!</p>
      </v-flex>
  
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters({
    abstracts: 'featuredAbstracts'
  })
}
</script>

<style scroped>

</style>
