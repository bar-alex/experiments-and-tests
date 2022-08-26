import styles from './style.module.css';
import { useState } from 'preact/hooks';
import { FaTrash } from 'react-icons/fa';


export default function NoteApp() {
	const [notes, setNotes] = useState([]);
	const [curNote, setCurrNote] = useState('');

	const addNote = (note_content) => {
		notes.push({
			id: notes.length,
			note: note_content
		});
		setCurrNote('');
	};

	const deleteNote = (note_idx) => {
		const new_notes = notes.filter( noteObj => noteObj.id !== note_idx);
		setNotes(new_notes);
	};

	const extractNotes = () => {
		//Object.values(notes).map(note => (
		notes.map(note => (
			<li key={note.id} class={styles.noteItem}>
				<span class={styles.deleteIcon} onClick={ e => deleteNote(note.id) }>
					<FaTrash size={20} color={"red"} />
				</span>
				{ note.note }
			</li>
			)
		);
	};

	return (
			<section class={styles.wmr_app}>
				<h1>WMR Note App</h1>

				<div class={styles.inputArea}>
					<input />
				</div>
			</section>
	);
}
