import React, {useState} from 'react';
import TextEditor from '../TextEditor/TextEditor';

export default function DiscussionEntryEditor({ onPublish }) {
	const [details, setDetails] = useState('');
	const [files, setFiles] = userState([]);
	const editorPlaceholder = 'Optionally.. Add elaboration to your question if you need to';

	// That would be the setting the dtails with the correct urls not the temp ones
	const uplaodFiles = () => {setDetails(details)}
	const handleSubmit = (e) => {
		e.preventDefault();
		/**
		 * upload images and make the content ready
		 * 
		 * call the publish thing passed as props
		 */
		// Upload images 
		onPublish(title, details)
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Title or summary:
				<input type="text" id='title' name='title' placeholder='Short title/summary or your entry... '/>
			</label>
			<label>
				Details (optional):
				<TextEditor placeholder={editorPlaceholder} value={details} setValue={setDetails} files={files} setFiles={setFiles}/>
			</label>

			<button type='submit'>Publish</button>
		</form>
	)
}
