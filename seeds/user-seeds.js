const { User } = require('../models');

const userData = [
    {
        username:'Xandromus',
        password:'testing123'
    },
    {
        username:'Lernantino',
        password:'testing123'
    },
];

const seedUser = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedUser;