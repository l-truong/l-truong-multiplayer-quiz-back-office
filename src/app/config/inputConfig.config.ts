export const inputConfig = {  
    loginParameters: {
        username: {
            min: 3,
            max: 15
        },
        password: {
            min: 8,
            max: 30
        }
    },
    categoryParameters: {
        name: {
            min: 3,
            max: 30,
        },
        description: {
            min: 3,
            max: 250,
        }    
    },
    questionsParameters: {
        questionText: {
            min: 3,
            max: 250,
        },
        answer: {
            min: 3,
            max: 250,
        },
        explanation: {
            min: 3,
            max: 250,
        },
        imageUrl: {
            min: 3,
            max: 250,
        }
    },
};