export const frConfig = {
  app: {      
    language: {      
      fr: 'fr',
      eng: 'eng'
    },     
    routing: {
      logout: 'Déconnexion',
      backoffice: 'Back-Office',      
      demo: 'demo',
      categories: 'Catégories',
      newCategory: 'Créer',
      viewAllCategories: 'Voir toutes',   
      questions: 'Questions',
      newQuestion: "Créer",
      viewAllQuestions: "Voir toutes",    
    },
    popup: { 
      delete: 'Supprimer',
      edit: 'Editer',
      confirmMessage: 'Êtes-vous sûr de vouloir supprimer cette',
      cancel: 'Annuler',
      confirm: 'Oui, continuer'
    },       
  },
  login: {
    title: 'Bienvenue',
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    login: 'Se connecter',
    demoAccessMessage: 'Pour accéder à la demo',
    errors: {
      usernameRequired: 'Nom d\'utilisateur requis',
      usernameTooShort: 'Nom d\'utilisateur trop court',
      passwordRequired: 'Mot de passe requis',
      passwordTooShort: 'Mot de passe trop court',
      incorrectLogin: 'Informations de connexion incorrectes'
    }
  },
  categories: {
    name: 'catégorie',    
    list: {
      title: 'Voir toutes les catégories',
      searchCategories: 'Chercher une catégorie',
      noCategoryAvailable: 'Aucune catégorie disponible',
      errors: {
        languageNotFound: 'Pas de langues trouvées'
      }
    },
    form: {
      title: 'Créer une nouvelle catégorie',            
      languageMessage: 'Sélectionner la langue',
      save: 'Enregistrer',
      errors: {            
        nameError: 'Un nom est requis',
        descriptionError: 'Une description est requise',
        languageError: 'Une langue est requise',
      }
    },
    model: {
      _id: 'id',
      categoryId: 'categoryId',
      name: 'nom',
      description: 'description',
      language: 'langue',
      createdAt: 'créé le',
      updatedAt: 'modifié le'
    }
  },  
  questions: {
    name: "questions",
    list: {      
      title: "Voir toutes les questions", 
      searchQuestions: 'Chercher une question',
      noQuestionAvailable: "Aucune question disponible",
      language: 'langue',     
      website: 'site',
      errors: {                      
        categoryDeleted: 'Catégorie supprimée',        
        languageNotFound: 'Pas de langues trouvées'
      } 
    },
    form: {      
      title: "Créer une nouvelle question",
      categoryMessage: "Sélectionner une catégorie",
      save: "Enregistrer",
      errors: {
        questionTextError: "Le texte de la question est requis",
        optionsError: "Le texte de l'option est requis",
        optionsErrorUnique: "Les options doivent être toutes différentes",      
        correctAnswerError: "Une réponse correcte est requise",
        correctAnswerErrorMustBeProvived: "La réponse correcte doit être l'une des options proposées",      
        explanationError: "Une explication est requise",
        categoryEmpty: 'Vous n\'avez aucune catégorie, veuillez créer une catégorie avant',
        categoryError: "Une catégorie est requise",
        imageUrlError: "Une URL d'image est requise",
      }
    },
    model: {
      _id: 'id',
      questionId: 'questionId',      
      questionText: 'question text',
      options: 'options',
      correctAnswer: "réponse correcte",
      explanation: 'explication',
      categoryId: 'categoryId',           
      imageUrl: "URL de l'image",     
      createdAt: 'créé le',
      updatedAt: 'modifié le'
    }
  }  
};