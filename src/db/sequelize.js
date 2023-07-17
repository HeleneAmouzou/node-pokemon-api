const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt')

let sequelize

if(process.env.NODE_ENV === 'production') {
  const sequelize = new Sequelize('kgz6yzi2tt71bgbr', 'r7r8ejive3su95j0', 'ojtfsie8z47tagvf', {
    host: 'q0h7yf5pynynaq54.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })
} else {
  sequelize = new Sequelize('pokedex', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })
}
  
const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
  
const initDb = () => {
  return sequelize.sync().then(_ => {
    console.log('INIT DB')
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then(pokemon => console.log(pokemon.toJSON()))
    })

    bcrypt.hash('pikachu', 10)
    .then(hash => {
      User.create({ 
        username: 'pikachu', 
        password: hash 
      })
    })
    //.then(user => console.log(user.toJSON()))

    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Pokemon, User
}
