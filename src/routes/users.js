import { Router } from 'express';  

import {validateUserData} from '../middleware/validation'

import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const router = Router()

export const users = []


router.post('/register', validateUserData, async (request, response) => {
	const { name, email, password } = request.body;

	const emailExist = users.find((user) => user.email === email);

	if (emailExist) {
		return response.status(400).json({
			message: 'E-mail já vinculado a um usuário, Por favor faça login ou utilize outro E-mail.',
		});
	}

	const encryptPassword = await bcrypt.hash(password, 10);

	const newUser = {
		id: uuidv4(),
		name,
		email,
		password: encryptPassword,
	};

	users.push(newUser);

	response.status(201).json({
		message: 'Conta criada com sucesso.',
		user: newUser,
	});
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	const user = users.find((user) => user.email === email);

	const comparePassword = await bcrypt.compare(password, user.password);

	if (!comparePassword) {
		return res.status(400).json({
			message: 'Password inválido',
		});
	}

	if (!user) {
		return res.status(404).json({
			message: 'Usuário não encontrado!!!',
		});
	}

	res.status(200).json({
		message: 'Login efetuado com sucesso!',
		idUser: user.id,
	});
});


export default router