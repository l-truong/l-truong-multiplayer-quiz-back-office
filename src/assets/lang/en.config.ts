export const enConfig = {
  app: {      
    language: {      
      fr: 'fr',
      eng: 'eng'
    },    
    routing: {       
      home: 'Home',   
      logout: 'Logout',   
      demo: 'No account ? go to demo',
      backoffice: 'Back-Office Demo',
      categories: 'Categories',
      newCategory: 'New',
      viewAllCategories: 'See all',    
      questions: 'Questions',
      newQuestion: 'New',
      viewAllQuestions: 'See all',    
    },
    popup: { 
      delete: 'Delete',
      edit: 'Edit',
      confirmMessage: 'Are you sure you want to delete this ',
      cancel: 'Cancel',
      confirm: 'Yes, continue'
    },
    alerts: {
      login: {
        underContruction: 'En court de construction',
        loggedWith: 'Connect with username: ',
        error: 'Please fill in both fields'
      }
    },
    errors: {
      languageNotFound: 'No language found',
      categoryDeleted: 'Category was deleted'
    }  
  },
  login: {
    title: 'Welcome',
    username: 'Username',
    password: 'Password',
    login: 'Login'
  },
  categories: {     
    name: 'category',    
    list: {
      title: 'View all categories',
      searchCategories: 'Search a category',
      noCategoryAvailable: 'No category available',
      categoryId: 'id',
      name: 'name',
      description: 'description',
      language: 'language',
      actions: 'actions'
    },
    new: {
      title: 'Create new category',
      name: 'Name',
      nameError: 'A name is required',
      description: 'Description',      
      descriptionError: 'A description is required',
      language: 'Language',
      languageMessage: 'Select a language',
      languageError: 'A language is required',
      save: 'Save'
    }
  },
  questions: {
    name: 'questions',    
    list: {
      title: 'View all questions',
      searchQuestions: 'Search a question',
      noQuestionAvailable: 'No question available',
      questionId: 'id',
      questionText: 'question text',
      options: 'options',
      correctAnswer: 'correct answer',
      explanation: 'explanation',
      category: 'category',
      language: 'language',
      imageUrl: 'image url',
      website: 'website',
      actions: 'actions'
    },
    new: {
      title: 'Create new question',
      questionText: 'Question text',
      questionTextError: 'A question text is required',
      options: 'Options',
      optionsError: 'Option text is required',
      optionsErrorUnique: 'Options must all be different',
      correctAnswer: 'Correct answer',
      correctAnswerError: 'A correct answer is required',
      correctAnswerErrorMustBeProvived: 'Correct answer must be one of the provided options',
      explanation: 'Explanation',
      explanationError: 'A explanation is required',
      category: 'Category',
      categoryMessage: 'Select category',
      categoryEmpty: 'You have no category created, please create a category first',
      categoryError: 'A category is required',
      imageUrl: 'Image Url',
      imageUrlError: 'A image Url is required',
      save: 'Save'
    }
  }
};