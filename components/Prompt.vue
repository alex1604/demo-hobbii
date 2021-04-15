<template>
  <v-dialog v-model="isVisible" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>{{ text }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="emitCancelRemove"> Cancel </v-btn>
        <v-btn color="error" text @click="emitConfirmRemove">
          {{ buttonText }}
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
export default class Prompt extends Vue {
  @Prop() title: string;
  @Prop() text: string;
  @Prop({ default: "Remove" }) buttonText: string;
  @Prop({ default: false }) isVisible: boolean;

  emitCancelRemove() {
    this.$emit("cancel");
  }

  emitConfirmRemove() {
    this.$emit("confirm");
  }
}
</script>