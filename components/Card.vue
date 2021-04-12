<template>
  <v-card class="mt-4 mx-4">
    <v-card-title>
      Project 1
      <v-spacer></v-spacer>
      <popup-menu>
        <v-icon>mdi-dots-vertical</v-icon>
      </popup-menu>
    </v-card-title>

    <v-text justify="center" align="center">
      <h1>15h</h1>
      <v-btn text color="teal accent-5">Start timer</v-btn>
    </v-text>
    <v-card-actions class="justify-center">
      <v-btn text color="teal accent-4" @click="toggleExpandedSection">
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%"
      >
        <v-card-text class="pb-0">
          <p class="display-1 text--primary">Origin</p>
          <p>
            late 16th century (as a noun denoting a place where alms were
            distributed): from medieval Latin eleemosynarius, from late Latin
            eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’
          </p>
        </v-card-text>
        <v-card-actions class="pt-0 justify-center">
          <v-btn text color="teal accent-4" @click="toggleExpandedSection">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PopupMenu from "~/components/PopupMenu.vue";
import IProject from "~/types/Project";

@Component({
  components: {
    PopupMenu,
  },
})
export default class Card extends Vue {
  @Prop() project!: IProject;
  reveal: boolean = false;

  toggleExpandedSection() {
    this.reveal = !this.reveal;
  }
}
</script>
<style lang="scss" scoped>
.v-card {
  width: 25rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>