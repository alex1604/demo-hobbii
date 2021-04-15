<template>
  <v-card class="mt-4 mx-4">
    <v-card-title
      >{{ project.projectName }}
      <v-spacer></v-spacer>
      <popup-menu
        v-if="!archiveMode"
        @complete="emitComplete"
        @remove="emitRemove"
        @invoice="emitInvoice"
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </popup-menu>
    </v-card-title>

    <v-col justify="center" align="center">
      <h1>{{ project.totalHours }} h</h1>
      <v-row v-if="!archiveMode" justify="center" class="mt-2">
        <v-btn
          text
          color="teal accent-5"
          :disabled="isTimerOn"
          @click="emitStartTimer"
          >Start timer</v-btn
        >
        <v-btn
          text
          color="red accent-4"
          :disabled="isTrackingAnotherProject"
          @click="emitStopTimer"
          >Stop timer</v-btn
        >
      </v-row>
    </v-col>
    <v-card-actions class="justify-center">
      <v-btn text color="teal accent-5" @click="toggleExpandedSection">
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%"
      >
        <v-card-text class="expand-card-text">
          <p class="text--secondary">Client: {{ project.clientName }}</p>
          <p>Invoiced hours: {{ project.invoicedHours }}</p>
          <small>project_id: {{ project.id }}</small>
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
import { Vue, Prop, Component } from "vue-property-decorator";
import { State } from "vuex-class-decorator";
import PopupMenu from "~/components/PopupMenu.vue";
import { IProject } from "~/types/Project";

@Component({
  components: {
    PopupMenu,
  },
})
export default class Card extends Vue {
  @Prop() project!: IProject;
  @Prop({ default: false }) archiveMode: boolean;

  @State("isTimerOn") isTimerOn: boolean;
  @State("activeProjectId") activeProjectId: string;

  reveal: boolean = false;

  get isTrackingAnotherProject() {
    return this.isTimerOn && this.activeProjectId !== this.project?.id;
  }

  get disableStartTimer() {
    return this.isTimerOn;
  }

  toggleExpandedSection() {
    this.reveal = !this.reveal;
  }

  emitComplete() {
    this.$emit("complete", this.project.id);
  }

  emitRemove() {
    this.$emit("remove", this.project.id);
  }

  emitStartTimer() {
    this.$emit("startTimer", this.project.id);
  }

  emitStopTimer() {
    this.$emit("stopTimer", this.project.id);
  }

  emitInvoice() {
    this.$emit("invoice", this.project.id);
  }
}
</script>
<style lang="scss" scoped>
.v-card {
  min-width: 20rem;
  width: 30%;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.expand-card-text {
  padding-bottom: 0;
  height: 100%;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>