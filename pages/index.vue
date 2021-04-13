<template>
  <v-container>
    <rounded-button text="Create new project" class="mb-6" />
    <v-row justify="center" align="center" class="flex-wrap">
      <card />
      <card />
      <card />
      <card />
      <card />
      <card />
      <card />
    </v-row>
  </v-container>
</template>

<script>
import Card from "~/components/Card.vue";
import RoundedButton from "~/components/RoundedButton.vue";

export default {
  components: {
    Card,
    RoundedButton,
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
</style>
