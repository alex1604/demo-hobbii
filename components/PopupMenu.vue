<template>
  <div class="text-center">
    <v-menu top :close-on-click="true" min-width="200px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on" class="popup-menu-button">
          <slot></slot>
        </v-btn>
      </template>

      <v-list>
        <v-list-item-title class="popup-menu-item" @click="emitComplete"
          >Mark as complete</v-list-item-title
        >
        <v-divider></v-divider>
        <v-list-item-title class="popup-menu-item" @click="emitInvoice"
          >Generate invoice</v-list-item-title
        >
        <v-divider></v-divider>
        <v-list-item-title class="popup-menu-item" @click="emitDelete"
          >Delete project</v-list-item-title
        >
      </v-list>
    </v-menu>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PopupMenu extends Vue {
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
<style lang="scss" scoped>
.popup-menu-button {
  min-width: 2rem !important;
  padding: 0 !important;
}

.popup-menu-item {
  padding: 5px;
}
</style>