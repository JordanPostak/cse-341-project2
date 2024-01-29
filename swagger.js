//...This is the swagger.js file...

const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Project 2 API',
        description: 'API documentation for Project 2',
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'],
    tags: [ // Define tags used in controllers
        {
            name: 'login/logout',
            description: 'Operations related to login/logout'
        },
        {
            name: 'blogs',
            description: 'Operations related to blogs'
        },
        {
            name: 'Authors',
            description: 'Operations related to authors'
        },
        {
            name: 'Comments',
            description: 'Operations related to comments'
        },
        {
            name: 'Reactions',
            description: 'Operations related to reactions'
        }
    ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/authors.js', './routes/blogs.js', './routes/comments.js', './routes/reactions.js']; 

// This will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);