import React from 'react';
import AnnouncementEntry from './AnnouncementEntry';
import {fromJS} from 'immutable'
export default function Announcements() {


		return (
			<div>
			<h1>Announcements</h1>
			{announcements.map((announcement) => (
				<AnnouncementEntry key={announcement.get('id')} content={announcement} />
			))}
		</div>
	);
}
	const announcements = fromJS([
		{
			user: {
				name: 'John Doe',
				id: '1234567890',
				pictureThumbnail: 'https://picsum.photos/100',
			},
			id: 'announcement-1',
			title: 'This is the title of the announcement',
			body: 'This is the content of the announcement',
			commentsCount: 10,
		},
		{
			user: {
				name: 'Jane Doe',
				id: '9876543210',
				pictureThumbnail: 'https://picsum.photos/101',
			},
			id: 'announcement-2',
			title: 'This is the title of the second announcement',
			body: 'This is the content of the second announcement',
			commentsCount: 5,
		},
	]);
