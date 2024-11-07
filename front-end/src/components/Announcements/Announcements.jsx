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
			<div>
			<h1>Announcements</h1>
			{
				isLoading ? (
					<Loading />
				) : (
					announcements.size === 0 ? (
						<h1>No announcements yet</h1>
					) : (
						announcements.map((announcement) => (
							<AnnouncementEntry key={announcement.get('id')} content={announcement} />
						))
					)
				)
			}
		</div>
	);
}
