const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URI, {
    dialect: 'mysql',
    dialectModule: require('mysql2')
})


const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    lastLogin: DataTypes.DATE,
    registrationTime: DataTypes.DATE,
    status: {
        type: DataTypes.ENUM,
        values: ['active', 'blocked'],
        defaultValue: 'active'
    }
});

sequelize.sync();

module.exports = { sequelize, User, dbConnection };
