<template>
  <v-row justify="start" align="center" class="flex-wrap">
    <card />
    <card />
    <card />
    <card />
    <card />
    <card />
    <card />
  </v-row>
</template>

<script>
import Card from "~/components/Card.vue";

export default {
  components: {
    Card,
  },
};
</script>
