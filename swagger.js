//...This is the swagger.js file...

const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Project 2 API',
        description: 'API documentation for Project 2',
    },
    host: 'https://project2-tltm.onrender.com',
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
        }
    ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/authors.js', './routes/blogs.js']; 

// This will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);