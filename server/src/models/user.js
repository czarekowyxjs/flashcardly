'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
  	uid: {
  		type: DataTypes.INTEGER.UNSIGNED,
  		unique: true,
  		autoIncrement: true,
  		primaryKey: true
  	},
    username: {
      type: DataTypes.STRING(99)
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true
    },
    sex: {
      type: DataTypes.STRING(1),
      defaultValue: 'u'
    },
    password: {
      type: DataTypes.STRING(999),
      required: true
    },
    emailHash: {
      type: DataTypes.STRING(999)
    },
    avatarUrl: {
      type: DataTypes.STRING(999),
      defaultValue: "male_av_1.png"
    },
  	createdAt: {
  		type: DataTypes.STRING(99)
  	}
  }, {
  	hooks: {
  		beforeCreate: function(user) {
  			user.createdAt = Math.floor(new Date().getTime()/1000);
  			return user;
  		}
  	},
  	tableName: 'Users',
  	timestamps: false
  });

  User.associate = function(models) {
    User.hasOne(models.Token, { foreignKey: 'uid' });
    User.hasOne(models.User_options, { foreignKey: "uid" });
    User.hasMany(models.Flashcard, { foreignKey: 'author' });
  };

  User.getFullUserData = function(userToken) {
    return this.findOne({
      include: [{
        model: sequelize.models.User_options
      }, {
        model: sequelize.models.Token,
        where: {
          token: userToken
        }
      }],
      attributes: {
        exclude: ['password']
      }
    })
    .then(function(foundUser) {
      if(foundUser) {
        return foundUser;
      } else {
        return null;
      }
    })
    .catch(function(err) {
      return 'Server error';
    });
  }

  User.generateHash = function(username) {
    var hash = "";
    const hashRounds = 4;

    for(let i = 0;i < hashRounds;++i) {
      hash += Math.random().toString(36).substring(2);
      if(username[i]) {
        hash += username[i];
      }
    }
    hash += username;
    hash += (new Date().getTime()).toString(36);
    return hash;
  }

  User.createUser = function(userData) {
    return this.create({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      emailHash: this.generateHash(userData.username)
    })
    .then(function(createdUser) {
      if(createdUser) {
        return sequelize.models.User_options.create({
          uid: createdUser.uid
        })
        .then(function(createdOptions) {
          return {
            user: createdUser 
          }
        })
        .catch(function(err) {
          return null;
        })
      } else {
        return null;
      }
    })
    .catch(function(err) {
      return null;
    })
  }
  return User;
};