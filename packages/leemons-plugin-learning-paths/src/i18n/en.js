module.exports = {
  libraryPage: {
    header: {
      title: 'Modules library',
      buttons: {
        new: 'New',
      },
    },
    tabs: {
      published: 'Published',
      draft: 'Drafts',
    },
  },
  moduleSetup: {
    header: {
      title: 'New module',
      buttons: {
        save: 'Save draft',
      },
    },
    tabs: {
      basicData: 'Basic data',
      structure: 'Structure',
    },
    buttons: {
      next: 'Next',
      previous: 'Previous',
      publishOptions: 'Publish options',
      publish: 'Publish',
      publishAndAssign: 'Publish and assign',
      publishAndShare: 'Publish and share',

      tooltips: {
        disabledNotResources: 'Add two or more activities to publish',
      },
    },
    steps: {
      basicData: {
        errors: {
          tagline: {
            required: 'Tagline is required',
          },
          program: {
            required: 'Program is required',
          },
          subject: {
            required: 'At least one subject is required',
          },
        },
      },
      structureData: {
        alerts: {
          error: {
            nonAssignableAsset: 'The selected resource is not an assignable acitivity',
          },
        },
        buttons: {
          new: 'New activity',
        },
        emptyState: {
          title: "¡Let's start creating!",
          description:
            'Add activities to the library and sort them as you want them to appear to the student.',
        },
        moduleComposer: {
          columns: {
            resource: 'Activity',
            type: 'Type',
            time: 'Tiempo',
            actions: 'Actions',
          },
          lastUpdate: 'Last update',
          types: {
            optional: 'Optional',
            recommended: 'Recommended',
            mandatory: 'Mandatory',
            blocking: 'Blocking',
          },
        },
      },
    },
    alert: {
      saveSuccess: 'Saved successfuly',
      saveError: 'An error occurred while saving',
      publishSuccess: 'Saved and published successfuly',
      publishError: 'An error occurred while saving and publishing',
    },
  },
  libraryCard: {
    menuItems: {
      edit: 'Edit',
      assign: 'Assign',
      duplicate: 'Duplicate',
      delete: 'Delete',
    },
    duplicate: {
      title: 'Duplicate module',
      message: 'Are you sure you want to delete the module {{name}}?',
      success: 'The module {{name}} has been duplicated',
      error: 'The module {{name}} could not be duplicated',
    },
    delete: {
      title: 'Delete module',
      message: 'Are you sure you want to delete the module {{name}}?',
      success: 'The module {{name}} has been deleted',
      error: 'The module {{name}} could not be deleted',
    },
  },
  assignation: {
    steps: {
      assignmentForm: {
        action: 'Assign as module',
      },
      setup: {
        action: 'Configuration',
      },
    },
    buttons: {
      previous: 'Previous',
      next: 'Next',
      assign: 'Assign',
    },
  },
};
