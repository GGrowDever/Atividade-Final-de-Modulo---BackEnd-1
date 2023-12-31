import { Router } from 'express';
import { users } from './users';

const router = Router();

import { v4 as uuidv4 } from 'uuid';

const notes = [];

router.post('/', (req, res) => {
	const { title, description, userId } = req.body;

	const user = users.find((user) => user.id === userId);

	if (!user) {
		return res.status(404).json({
			message: 'Usuário não encontrado',
		});
	}

	const newNote = {
		id: uuidv4(),
		title,
		description,
		userId,
	};

	notes.push(newNote);

	res.status(201).json({
		message: 'Recado criado com sucesso!',
		newNote,
	});
});

router.get('/:userId', (req, res) => {
	const { userId } = req.params;

	const { page, perPage } = req.query;

	const user = users.find((user) => user.id === userId);

	if (!user) {
		return res.status(404).json({
			message: 'Usuário não encontrado!',
		});
	}

	const currentPage = parseInt(page) || 1;
	const itemsPerPage = parseInt(perPage) || 10;

	const userNotes = notes.filter((note) => note.userId === userId);

	const totalNotes = userNotes.length;

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const paginatedNotes = userNotes.slice(startIndex, endIndex);

	const totalPages = Math.ceil(totalNotes / itemsPerPage);

	res.status(200).json({
		userNotes: paginatedNotes,
		totalPages,
		currentPage,
	});
});

router.put('/:noteId', (req, res) => {
	const { noteId } = req.params;
	const { title, description } = req.body;

	const noteIndex = notes.findIndex((note) => note.id === noteId);

	if (noteIndex === -1) {
		return res.status(404).json({
			message: 'Recado não encontrado!',
		});
	}

	notes[noteIndex].title = title;
	notes[noteIndex].description = description;

	res.status(200).json({
		message: 'Recado atualizado com sucesso!',
	});
});

router.delete('/:noteId', (req, res) => {
	const { noteId } = req.params;

	const noteIndex = notes.findIndex((note) => note.id === noteId);

	if (noteIndex === -1) {
		return res.status(404).json({
			message: 'Recado não encontrado!',
		});
	}

	const noteDeleted = notes.splice(noteIndex, 1);

	res.status(200).json({
		message: 'Recado excluído  com sucesso',
		noteDeleted,
	});
});

export default router;
