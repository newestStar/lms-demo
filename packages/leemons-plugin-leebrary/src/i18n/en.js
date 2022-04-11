module.exports = {
  home: {
    navbar: {
      quickAccess: 'Quick access',
      uploadButton: 'Upload or create',
      createNewTitle: 'Create new',
      fileUploadTitle: 'Click to browse your file',
      fileUploadSubtitle: 'or drop here a file from your computer',
    },
  },
  assetSetup: {
    header: {
      back: 'Back',
      close: 'Close',
    },
    basicData: {
      header: {
        stepLabel: 'Basic data',
        titleNew: 'New resource',
        titleEdit: 'Edit resource',
        back: 'Back',
      },
      bookmark: {
        title: 'New bookmark',
      },
      labels: {
        title: 'Upload file',
        featuredImage: 'Featured image',
        tags: 'Tags',
        addTag: 'Add tag',
        changeImage: 'Change image',
        uploadButton: 'Upload image',
        submitForm: 'Add to library',
        name: 'Name',
        description: 'Description',
        createdSuccess: 'Asset successfully created',
        url: 'URL (webpage link)',
        checkUrl: 'Check url',
      },
      descriptions: {
        featuredImage: "Only if you want to change the webpage's default featured image",
      },
      placeholders: {
        tagsInput: 'Name of tag',
        name: 'Name of the resource',
        url: 'Webpage link',
        description: 'Description of the resource',
        color: 'Select a color',
      },
      errorMessages: {
        name: 'Name is required',
        url: 'URL is required',
        file: 'File is required',
        tags: 'Write a tag to add it',
      },
    },
    permissionsData: {
      header: {
        stepLabel: 'Permissions',
        shareTitle: 'Share resource',
        close: 'Close',
      },
      labels: {
        title: 'Resource permissions',
        addUsers: 'Add users',
        addUsersDescription: 'To share resource and set permissions',
        isPublic: 'This resource is public',
        saveButton: 'Save permissions',
        shareButton: 'Share',
        addUserButton: 'Add',
        editUserButton: 'Edit',
        removeUserButton: 'Remove',
        acceptButton: 'Accept',
        cancelButton: 'Cancel',
        permissionsSuccess: 'Permissions successfully established',
        shareSuccess: 'Resource successfully shared',
      },
      placeholders: {
        userInput: 'Start typing a name',
        userRole: 'Select role',
      },
      errorMessages: {
        user: 'User is required',
        userRole: 'Role is required',
        share: 'You are not allowed to share this resource',
      },
    },
    roleLabels: {
      viewer: 'Viewer',
      commentor: 'Commentor',
      editor: 'Editor',
      owner: 'Owner',
      public: 'Public',
    },
  },
};
