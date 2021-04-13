<template>
  <div class="text-center">
    <v-btn outlined :color="color" rounded @click="emitClick">
      <v-icon class="mr-6" :color="color">mdi-plus-circle-outline</v-icon>
      <span>{{ text }}</span>
    </v-btn>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class RoundedButton extends Vue {
  @Prop() text!: string;
  @Prop() color: string = "teal accent-8";

  emitClick() {
    this.$emit("click");
  }
}
</script>