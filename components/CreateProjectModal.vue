<template>
  <v-row justify="center">
    <v-dialog
      v-model="isVisible"
      persistent
      max-width="600px"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <slot v-bind="attrs" v-on="on"></slot>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Create new project</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="18" sm="9" md="6">
                <v-text-field
                  v-model="projectName"
                  :color="isNameDuplicated ? 'red' : ''"
                  label="Project name*"
                  required
                ></v-text-field>
                <small
                  v-if="isNameDuplicated"
                  :class="isNameDuplicated ? 'warning-duplicate' : ''"
                >
                  A project with this name already exists. Pick a different
                  name.
                </small>
              </v-col>
              <v-col cols="18" sm="9" md="6">
                <v-text-field
                  v-model="clientName"
                  label="Client name*"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="emitCancel"> Cancel </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="emitCreate"
            :disabled="isNameDuplicated"
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class-decorator";

@Component
export default class CreateProjectModal extends Vue {
  @Prop({ default: true }) isVisible: boolean;
  @Getter("projectNames") projectNames: string[];
  projectName: string = "";
  clientName: string = "";

  get isNameDuplicated(): boolean {
    return this.projectNames.includes(this.projectName);
  }

  clearForm() {
    this.projectName = "";
    this.clientName = "";
  }

  emitCancel() {
    this.clearForm();
    this.$emit("cancel");
  }

  emitCreate() {
    const { projectName, clientName } = this;
    this.clearForm();
    this.$emit("create", { projectName, clientName });
  }
}
</script>
<style lang="scss" scoped>
.warning-duplicate {
  color: red;
}
</style>