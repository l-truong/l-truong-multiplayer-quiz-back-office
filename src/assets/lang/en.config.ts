export const enConfig = {
  app: {      
    language: {      
      fr: 'fr',
      eng: 'eng'
    },    
    routing: {       
      logout: 'Logout',   
      backoffice: 'Back-Office',      
      demo: 'demo',
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
  },
  login: {
    title: 'Welcome',
    username: 'Username',
    password: 'Password',
    login: 'Login',
    demoAccessMessage: 'To access the demo',
    errors: {
      usernameRequired: 'Username requis',
      usernameTooShort: 'Username trop court',
      passwordRequired: 'Password requis',
      passwordTooShort: 'Password trop court',
      incorrectLogin: 'Identifiants incorrects'
    }
  },
  categories: {     
    name: 'category',    
    list: {
      title: 'View all categories',
      searchCategories: 'Search a category',
      noCategoryAvailable: 'No category available',   
      errors: {
        languageNotFound: 'No language found'
      }
    },
    form: {
      title: 'Create new category',
      languageMessage: 'Select a language',
      save: 'Save',
      errors: {      
        nameError: 'A name is required',
        descriptionError: 'A description is required',      
        languageError: 'A language is required',
      },
    },    
    model: {
      _id: 'id',
      categoryId: 'categoryId',
      name: 'name',
      description: 'description',
      language: 'language',
      createdAt: 'created at',
      updatedAt: 'updated at'
    }
  },
  questions: {
    name: 'questions',    
    list: {
      title: 'View all questions',
      searchQuestions: 'Search a question',
      noQuestionAvailable: 'No question available',     
      language: 'language',
      website: 'website',
      errors: {      
        categoryDeleted: 'Category deleted',
        languageNotFound: 'No language found'
      } 
    },
    form: {
      title: 'Create new question',
      categoryMessage: 'Select category',
      save: 'Save',
      errors: {      
        questionTextError: 'A question text is required',
        optionsError: 'Option text is required',
        optionsErrorUnique: 'Options must all be different',
        correctAnswerError: 'A correct answer is required',
        correctAnswerErrorMustBeProvived: 'Correct answer must be one of the provided options',
        explanationError: 'A explanation is required',              
        categoryEmpty: 'You have no category created, please create a category first',
        categoryError: 'A category is required',
        imageUrlError: 'A image Url is required',
      } 
    },    
    model: {
      _id: 'id',
      questionId: 'questionId',      
      questionText: 'question text',
      options: 'options',
      correctAnswer: 'correct answer',
      explanation: 'explanation',
      categoryId: 'categoryId',   
      imageUrl: 'image Url',     
      createdAt: 'created at',
      updatedAt: 'updated at'
    }
  }
};