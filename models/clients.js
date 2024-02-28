const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models/connexion-sequelize');

class Clients extends Sequelize.Model { }

Clients.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        firstname: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        lastname: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.INTEGER
        },
        address_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Address',
                key: 'id'
            }
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
            type: DataTypes.DATE
        },
    },
    {
        sequelize,
        modelName: 'Clients',
        tableName: 'client',
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    }
);

module.exports = Clients;