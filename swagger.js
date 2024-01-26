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
            name: 'blogs',
            description: 'Operations related to blogs'
        },
        {
            name: 'Users',
            description: 'Operations related to users'
        }
    ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/users.js', './routes/blogs.js']; 

// This will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);