export function validateUserData (req, res, next) {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400).json('Nome, e-mail e senha são obrigatórios');
	}
	next();
};
