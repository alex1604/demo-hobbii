<template>
  <v-container>
    <create-project-modal
      v-if="!archiveView"
      :isVisible="showCreateProjectModal"
      @cancel="toggleCreateProjectModal"
      @create="createProject"
    >
      <rounded-button
        text="Create new project"
        class="my-8"
        @click="toggleCreateProjectModal"
      />
    </create-project-modal>
    <v-row
      justify="center"
      align="center"
      class="flex-wrap"
      v-if="!isProjectsEmpty"
    >
      <card
        v-for="project in projects"
        :archiveMode="archiveView"
        :project="project"
        :key="project.id"
        @complete="triggerArchivePrompt"
        @remove="triggerRemovePrompt"
        @startTimer="dispatchStartTrackingAction"
        @stopTimer="dispatchStopTrackingAction"
        @invoice="dispatchCreateInvoiceAction"
      />
    </v-row>
    <invoice-alert
      v-if="latestInvoice"
      :invoice="latestInvoice"
      :isVisible="displayInvoice"
      @confirm="dismissInvoice"
    />
    <prompt
      :isVisible="showRemovePrompt"
      :title="`Remove project ?`"
      :text="`Are you sure you want to remove the project ${removedProjectName} ?`"
      @cancel="cancelRemove"
      @confirm="removeProject"
    ></prompt>
    <prompt
      :isVisible="showArchivePrompt"
      :title="`Mark as complete ?`"
      :text="`Are you sure you want to mark the project '${removedProjectName}' as complete ? This action is irreversible. You will still be able to see the project in the 'Archive' page.`"
      buttonText="Archive"
      @cancel="cancelArchive"
      @confirm="archiveProject"
    ></prompt>
  </v-container>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Card from "@/components/Card.vue";
import CreateProjectModal from "@/components/CreateProjectModal.vue";
import RoundedButton from "@/components/RoundedButton.vue";
import { Action, State } from "vuex-class-decorator";
import { IProject, IInvoice } from "~/types/Project";

@Component({
  components: {
    Card,
    CreateProjectModal,
    RoundedButton,
  },
})
export default class ProjectsOverview extends Vue {
  @Action("createProject") dispatchCreateProjectAction;
  @Action("removeProject") dispatchRemoveProjectAction;
  @Action("startTracking") dispatchStartTrackingAction;
  @Action("stopTracking") dispatchStopTrackingAction;
  @Action("createInvoice") dispatchCreateInvoiceAction;
  @Action("displayInvoice") dispatchDisplayInvoiceAction;
  @Action("archiveProject") dispatchArchiveProject;
  @Action("archiveProject") dispatchArchiveProjectAction;

  @State("projects") activeprojects: IProject[];
  @State("archive") archive: IProject[];
  @State("latestInvoice") latestInvoice: IInvoice;
  @State("displayInvoice") displayInvoice: boolean;

  @Prop({ default: false }) archiveView: boolean;

  showCreateProjectModal: boolean = false;
  showRemovePrompt: boolean = false;
  showArchivePrompt: boolean = false;
  activeProjectId: string = "";

  get projects(): IProject[] {
    return this.archiveView ? this.archive : this.activeprojects;
  }

  get removedProjectName() {
    return this.projects.find(
      (project: IProject) => project.id === this.activeProjectId
    )?.projectName;
  }

  get isProjectsEmpty() {
    return this.projects?.length === 0;
  }

  toggleCreateProjectModal() {
    this.showCreateProjectModal = !this.showCreateProjectModal;
  }

  toggleRemovePrompt() {
    this.showRemovePrompt = !this.showRemovePrompt;
  }

  toggleArchivePrompt() {
    this.showArchivePrompt = !this.showArchivePrompt;
  }

  createProject(payload: { projectName: string; clientName: string }) {
    this.dispatchCreateProjectAction(payload);
    this.toggleCreateProjectModal();
  }

  triggerRemovePrompt(projectId) {
    this.activeProjectId = projectId;
    this.toggleRemovePrompt();
  }

  triggerArchivePrompt(projectId) {
    this.activeProjectId = projectId;
    this.toggleArchivePrompt();
  }

  cancelRemove() {
    this.toggleRemovePrompt();
  }

  cancelArchive() {
    this.toggleArchivePrompt();
  }

  removeProject() {
    this.toggleRemovePrompt();
    this.dispatchRemoveProjectAction(this.activeProjectId);
    this.activeProjectId = "";
  }

  archiveProject() {
    this.toggleArchivePrompt();
    this.dispatchArchiveProjectAction(this.activeProjectId);
    this.activeProjectId = "";
  }

  dismissInvoice() {
    this.dispatchDisplayInvoiceAction(false);
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