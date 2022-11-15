const { DataTypes, NOW } = require("sequelize");
const { sequelize } = require("./db");

module.exports = sequelize.define('room_booking_history', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  room_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  user_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  from_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: NOW,
  },
  to_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: "CREATED"
  }
}, {
  sequelize,
  tableName: 'room_booking_history',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "room_id" },
      ]
    },
  ]
});
