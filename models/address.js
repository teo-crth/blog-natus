const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models/connexion-sequelize');

class Address extends Sequelize.Model { }

Address.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        street: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        zip_code: {
            type: DataTypes.STRING(5),
            allowNull: false
        },
        city: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        country: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        infos: {
            type: DataTypes.TEXT
        },
        client_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Client', // Assuming the referenced model is named 'Client'
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
        modelName: 'Address',
        tableName: 'address',
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    }
);

module.exports = Address;