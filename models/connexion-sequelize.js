const { Sequelize } = require('sequelize');

// connexion a la BDD
const sequelize = new Sequelize(process.env.PG_URL, {define: {timestamps: true, createdAt: "created_at", updatedAt: "updated_at"}})

module.exports = sequelize;