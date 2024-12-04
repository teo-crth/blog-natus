
const Clients = require('./clients')
const Address = require('./address')

Clients.hasMany(Address, {
    foreignKey: 'id',
    as: 'address',
})

Address.belongsTo(Clients, {
    foreignKey: 'id',
    as: 'client'
})

module.exports = { Clients, Address }