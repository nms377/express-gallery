module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User", {
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		role: DataTypes.STRING,
		favColor: DataTypes.STRING,
		isAdmin: DataTypes.BOOLEAN
	}, {
		classMethods: {
			associate: function(models) {
				User.hasMany(models.Gallery);
			}
		}
	});

	return User;
};