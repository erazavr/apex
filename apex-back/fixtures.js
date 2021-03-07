const mongoose = require('mongoose');
const nanoid = require('nanoid');
const config = require('./config');

const User = require('./models/User');


const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name)
    }

    const [user1,user2] = await User.create({
        username: 'admin',
        password: '123',
        role: 'admin',
        token: nanoid()
    },{
        username: 'user',
        password: 123,
        token: nanoid(),
        role: 'user',
    });

    mongoose.connection.close();
};


run().catch(error => {
    throw error
});