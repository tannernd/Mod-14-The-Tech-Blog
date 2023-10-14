const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model { }

Posts.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
          },
      },      
      title: {
        type: DataTypes.STRING
      },
      post: {
        type: DataTypes.TEXT
      }
    },
    {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'posts'
    }
  );
  
  module.exports = Posts;