export const frConfig = {
  app: {      
    language: {      
      fr: 'fr',
      eng: 'eng'
    },     
    routing: {
      home: 'Accueil',    
      logout: 'Déconnexion',
      demo: 'Pas de compte ? aller à la demo',
      backoffice: 'Back-Office Demo',
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
    alerts: {
      login: {
        underContruction: 'Currently under construction',
        loggedWith: 'Connecter avec l\'utilisateur: ',
        error: 'Veuillez remplir les deux champs'
      }
    },
    errors: {
      languageNotFound: 'Pas de langues trouvées',
      categoryDeleted: 'Catégorie supprimée'
    }  
  },
  login: {
    title: 'Bienvenue',
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    login: 'Se connecter'
  },
  categories: {
    name: 'catégorie',    
    list: {
      title: 'Voir toutes les catégories',
      searchCategories: 'Chercher une catégorie',
      noCategoryAvailable: 'Aucune catégorie disponible',
      categoryId: 'id',
      name: 'nom',
      description: 'description',
      language: 'langue',
      actions: 'actions',
    },
    new: {
      title: 'Créer une nouvelle catégorie',
      name: 'Nom',
      nameError: 'Un nom est requis',
      description: 'Description',      
      descriptionError: 'Une description est requise',
      language: 'Langue',
      languageMessage: 'Sélectionner la langue',
      languageError: 'Une langue est requise',
      save: 'Enregistrer'
    }
  },  
  questions: {
    name: "questions",
    list: {      
      title: "Voir toutes les questions", 
      searchQuestions: 'Chercher une question',
      noQuestionAvailable: "Aucune question disponible",
      questionId: "id",
      questionText: "texte de la question",
      options: "options",
      correctAnswer: "réponse correcte",
      explanation: "explication",
      category: "catégorie",
      language: 'langue',
      imageUrl: "url de l'image",      
      website: 'site',
      actions: "actions"
    },
    new: {      
      title: "Créer une nouvelle question",
      questionText: "Texte de la question",
      questionTextError: "Le texte de la question est requis",
      options: "Options",
      optionsError: "Le texte de l'option est requis",
      optionsErrorUnique: "Les options doivent être toutes différentes",
      correctAnswer: "Réponse correcte",
      correctAnswerError: "Une réponse correcte est requise",
      correctAnswerErrorMustBeProvived: "La réponse correcte doit être l'une des options proposées",
      explanation: "Explication",
      explanationError: "Une explication est requise",
      category: "Catégorie",
      categoryMessage: "Sélectionner une catégorie",
      categoryEmpty: 'Vous n\'avez aucune catégorie, veuillez créer une catégorie avant',
      categoryError: "Une catégorie est requise",
      imageUrl: "URL de l'image",
      imageUrlError: "Une URL d'image est requise",
      save: "Enregistrer"
    }
  }  
};