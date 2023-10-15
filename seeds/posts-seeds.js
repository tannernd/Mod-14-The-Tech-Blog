const { Posts } = require('../models');

const postsData = [
    {
        user_id: 1,
        title:'Why MVC is so important',
        post:'MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer of data, the View layer for design, and the Controller layer for application logic.'
    },
    {
        user_id: 1,
        title:'Authentication vs. Authorization',
        post:'There is a difference between authentication and authorization. Athentication means confirming your own identity, whereas authorization means being allowed access to the system.'
    },
    {
        user_id: 2,
        title:'Object-Relational Mapping',
        post:'I have really loved learning about ORMs.  It\'s really simplified the way I create quieries in SQL!'
    },
];

const seedPosts = () => Posts.bulkCreate(postsData);

module.exports = seedPosts;