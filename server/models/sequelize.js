const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bendb','postgres','bennett12345',{
    host:"localhost",
    dialect:"postgres",
    logging:true
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to PostgreSQL using Sequelize!');
    } catch (error) {
        console.error('Unable to connect to PostgreSQL:', error);
    }
})();

module.exports = sequelize;