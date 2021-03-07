const path = require('path');

const rootPath = __dirname;
let database = 'mongodb://localhost/apex';
let port = 8000;
module.exports = {
    port,
    rootPath,
    uploadPath: path.join(rootPath, 'public', 'uploads'),
    database,
    databaseOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
};