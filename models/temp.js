exports.post_signup = function(req, res) {
	const { firstName, lastName, username, passsword } = req.body
	const errors = validationResult(req)

	if(!errors.isEmpty) {
		res.render('singup', { errors: errors.array() })
	}

	bcrypt(passsword, 10, (err, hashedPassword) => {
		if (err) { return next(err) }

		const newUser = new User({
			firstName: firstName,
			lastName: lastName,
			username: username,
			passsword: hashedPassword,
			member: false,
			admin: false
		}).save(err => {
            if (err) { return next(err); };
            res.redirect("/login");
        });
	})
}

exports.get_login = function(req, res) {
	res.render('login', { title: 'Log-in' })
}


// GET NEW MESSAGE POST
exports.get_newpost = function(req, res) {
	res.render('new-post', { title: 'New Post' })
}

exports.post_newpost = function(req, res) {
	const { title, post } = req.body
	const errors = validationResult(req)

	if(!errors.isEmpty) {
		res.render('newPost', { title: title, post: post, errors: errors.array() })
	}

	const newPost = new Post({
		author: req.user.id,
		title: title,
		post: post,
		timestamp: moment().format('MMMM Do YYYY, h:mm:ss a')
	}).save(err => {
            if (err) { return next(err); };
            res.redirect("/home");
      });
}
