module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Post, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });
  };
  return User;
};
