<template>
  <v-dialog v-model="isVisible" persistent max-width="290">
    <v-card>
      <v-card-title class="headline"> Remove project ? </v-card-title>
      <v-card-text
        >Are you sure you want to remove {{ projectName }} ?</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="emitCancelRemove">
          Cancel
        </v-btn>
        <v-btn color="green darken-1" text @click="emitConfirmRemove">
          Remove
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from "vue";
import { Prop } from "vue-property-decorator";
import { Component } from "vuex-class-decorator";

@Component
export default class RemovePrompt extends Vue {
  @Prop() projectName: string;
  @Prop({ default: false }) isVisible: boolean;

  emitCancelRemove() {
    this.$emit("cancelRemove");
  }

  emitConfirmRemove() {
    this.$emit("confirmRemove");
  }
}
</script>