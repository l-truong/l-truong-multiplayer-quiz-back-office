export const config = {  
  api: {
    baseUrl: 'https://l-truong-multiplayer-quiz-back.onrender.com'
  },
  localStorage: {
    sufix: 'l-truong-multiplayer-quiz-backoffice.',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    language: 'language',
    categories: 'categories',
    questions: 'questions'
  },
  timeout: {
    token: 14 * 60 * 1000, // 15min
    inactivity: 15 * 60 * 1000 // 15min
  },
  otherParameters: {
    demo: {
      username: 'demoUsername',
      password: 'demoPassword01!@',
      demoAccessToken: 'demoAccessToken',
      demoRefreshToken: 'demoRefreshToken'
    },
    languages: {
      eng: 'English',
      fr: 'Français'
    },
    defaultLanguage: 'fr'
  }
};