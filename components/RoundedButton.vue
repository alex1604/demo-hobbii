<template>
  <div class="text-center">
    <v-btn :color="buttonColor" outlined rounded @click="emitClick">
      <v-icon class="mr-6" :color="buttonColor">mdi-plus-circle-outline</v-icon>
      <span>{{ text }}</span>
    </v-btn>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class RoundedButton extends Vue {
  @Prop() text!: string;
  @Prop({ default: "teal accent-8" }) color: string;

  get buttonColor() {
    return this.color;
  }

  emitClick() {
    this.$emit("click");
  }
}
</script>