<template>
  <div class="text-center">
    <!-- <v-switch v-model="closeOnClick" label="Close on click"></v-switch> -->
    <v-menu top :close-on-click="closeOnClick">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">
          <slot></slot>
        </v-btn>
      </template>

      <v-list>
        <v-list-item-title @click="emitComplete"
          >Mark as complete</v-list-item-title
        >
        <v-list-item-title @click="emitInvoice"
          >Generate invoice</v-list-item-title
        >
        <v-list-item-title @click="emitDelete"
          >Delete project</v-list-item-title
        >
      </v-list>
    </v-menu>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

// The @Component decorator indicates the class is a Vue component
@Component
export default class PopupMenu extends Vue {
  // Component methods can be declared as instance methods
  emitComplete() {
    this.$emit("complete");
  }
  emitInvoice() {
    this.$emit("invoice");
  }
  emitDelete() {
    this.$emit("delete");
  }
}
</script>