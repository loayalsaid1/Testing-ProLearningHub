import React, {useState} from 'react';
import AnnouncementHeader from './AnnouncementHeader';
import CommentPrompt from './CommentPrompt';
import CommentsList from './CommentsList';

export default function AnnouncementEntry({content}) {
	const [showComments, setShowComments] = useState(false);
	return (
		<div>
			<AnnouncementHeader content={content} />
			<CommentPrompt announcementId={content.get('id')} />
			{
				!showComments ? (
					<button type='button' onClick={() => setShowComments(true)}>
					{content.get('commentsCount')} comment{content.get('commentsCount') !== 1 ? 's' : ''}
					</button>
				) : (
					<CommentsList announcementId={content.get('id')} />
				)
			}
			<hr />
		</div>
	);
}
