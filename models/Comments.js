const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model { }

Comments.init(
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
      post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'posts',
            key: 'id',
          },
      },     
      comment: {
        type: DataTypes.TEXT
      }
    },
    {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'comments'
    }
  );
  
  module.exports = Comments;