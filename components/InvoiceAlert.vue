<template>
  <v-dialog v-model="isVisible" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">
        Invoice id: {{ invoice.id }}
      </v-card-title>
      <v-card-text
        >You have successfully invoiced project "{{ invoice.projectName }}" for
        a total of {{ invoice.amount }} DKK:<br /><br />
        Hours: {{ invoice.hours }}<br />
        Price/unit: {{ hourlyRate }} DKK<br />
        _____________<br />
        Total: {{ invoice.amount }} DKK
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="emitConfirm"> OK </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from "vue";
import { Prop } from "vue-property-decorator";
import { Component, State } from "vuex-class-decorator";
import { IInvoice } from "~/types/Project";

@Component
export default class InvoiceAlert extends Vue {
  @State("hourlyRate") hourlyRate: number;
  @Prop() invoice: IInvoice;
  @Prop({ default: false }) isVisible: boolean;

  emitConfirm() {
    this.$emit("confirm");
  }
}
</script>