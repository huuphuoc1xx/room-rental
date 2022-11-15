const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

module.exports = sequelize.define('user', {
  user_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true
  },
  hash_pw: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: ""
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
}, {
  sequelize,
  tableName: 'user',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "user_name" },
      ]
    },
  ]
});
