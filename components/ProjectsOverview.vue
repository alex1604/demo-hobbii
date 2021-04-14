<template>
  <v-container>
    <create-project-modal
      :isVisible="showCreateProjectModal"
      @cancel="toggleCreateProjectModal"
      @create="createProject"
    >
      <rounded-button
        text="Create new project"
        class="mb-6"
        @click="toggleCreateProjectModal"
      />
    </create-project-modal>
    <v-row justify="center" align="center" class="flex-wrap">
      <card
        :v-if="!isProjectsEmpty"
        v-for="project in projects"
        :project="project"
        :key="project.id"
        @remove="triggerRemovePrompt"
      />
    </v-row>
    <remove-prompt
      :isVisible="showRemovePrompt"
      :projectName="removedProjectName"
      @cancelRemove="cancelRemove"
      @confirmRemove="removeProject"
    ></remove-prompt>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Card from "@/components/Card.vue";
import CreateProjectModal from "@/components/CreateProjectModal.vue";
import RoundedButton from "@/components/RoundedButton.vue";
import { State } from "vuex-class-decorator";
import IProject from "~/types/Project";

@Component({
  components: {
    Card,
    CreateProjectModal,
    RoundedButton,
  },
})
export default class ProjectsOverview extends Vue {
  @State("projects") projects: IProject[];

  showCreateProjectModal: boolean = false;
  showRemovePrompt: boolean = false;
  currentRemoveId: string = "";

  get removedProjectName() {
    return this.projects.find(
      (project: IProject) => project.id === this.currentRemoveId
    )?.projectName;
  }

  get isProjectsEmpty() {
    return this.projects?.length > 0;
  }

  toggleCreateProjectModal() {
    this.showCreateProjectModal = !this.showCreateProjectModal;
  }

  toggleRemovePrompt() {
    this.showRemovePrompt = !this.showRemovePrompt;
  }

  createProject(payload: { projectName: string; clientName: string }) {
    this.$store.dispatch("createProject", payload);
    this.toggleCreateProjectModal();
  }

  triggerRemovePrompt(projectId) {
    this.currentRemoveId = projectId;
    this.toggleRemovePrompt();
  }

  cancelRemove() {
    this.toggleRemovePrompt();
  }

  removeProject() {
    this.toggleRemovePrompt();
    this.$store.dispatch("removeProject", this.currentRemoveId);
    this.currentRemoveId = "";
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
</style>