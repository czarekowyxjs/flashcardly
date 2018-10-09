const Router = require("express").Router();
const models = require("../models");

Router.post("/signin/facebook", function(req, res) {
	const fbData = req.body.data;
	models.Facebook.findOne({
		where: {
			userID: fbData.authResponse.userID
		}
	})
	.then(function(foundFacebook) {
		if(foundFacebook) {
			foundFacebook.updateAttributes({
				signedRequest: fbData.authResponse.signedRequest,
				pictureURL: fbData.user.picture.data.url,
				firstName: fbData.user.first_name,
				lastName: fbData.user.last_name
			}).then(function(updatedFB) {
				models.User.findOne({
					where: {
						uid: updatedFB.uid
					},
					include: [{
						model: models.User_options
					}]
				}).then(function(foundUser) {
					res.status(200).send({
						status: "Logged",
						user: {
							common: foundUser,
							fb: updatedFB
						}
					});			
				});
			});
		} else {
			models.User.create({})
			.then(function(createdUser) {
				models.Facebook.create({
					uid: createdUser.uid,
					accessToken: fbData.authResponse.accessToken,
					signedRequest: fbData.authResponse.signedRequest,
					userID: fbData.authResponse.userID,
					pictureURL: fbData.user.picture.data.url,
					firstName: fbData.user.first_name,
					lastName: fbData.user.last_name
				})
				.then(function(createdFB) {
					models.User_options.create({
						uid: createdUser.uid
					})
					.then(function(createdUserOptions) {
						createdUser["User_option"] = createdUserOptions;
						res.status(200).send({
							status: "Logged",
							user: {
								common: createdUser,
								fb: createdFB
							}
						});
					});
				});
			});
		}
	});
});

module.exports = Router;