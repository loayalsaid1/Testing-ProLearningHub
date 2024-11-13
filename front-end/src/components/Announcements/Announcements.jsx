import React, {useEffect} from 'react';
import Loading from '../utilityComponents/Loading';
import AnnouncementEntry from './AnnouncementEntry';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectAnnouncements } from '../../redux/selectors/announcementsSelectors';
import { fetchAnnouncements } from '../../redux/actions/announcementsThunks';

export default function Announcements() {
		const isLoading = useSelector(selectIsLoading);
		const announcements = useSelector(selectAnnouncements);

		const dispatch = useDispatch();
		useEffect(() => {
			if (!announcements?.size)
				dispatch(fetchAnnouncements());
		}, [dispatch, announcements])


		return (
			<div className="container line-spacing">
				<h1 className="text-center mb-4">Announcements</h1>
				{isLoading ? (
				<Loading />
				) : announcements.size === 0 ? (
				<h4 className="text-center text-muted mt-5">No announcements yet</h4>
				) : (
				announcements.map((announcement) => (
					<AnnouncementEntry
					key={announcement.get('id')}
					content={announcement}
					className="my-4 p-3 rounded shadow-sm"
					/>
				))
				)}
			</div>
	);
}
