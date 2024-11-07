import toast from 'react-hot-toast';
import * as creators from './announcementsActionCreators';
import { DOMAIN } from '../../utils/constants';

export const fetchAnnouncements = () => async (dispatch, getState) => {
  dispatch(creators.fetchAnnouncementsRequest());
  const courseId = getState().ui.getIn(['course', 'id']) || 'testId';
  try {
    const response = await fetch(`${DOMAIN}/courses/${courseId}/announcements`, {
      mode: 'no-cors',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    dispatch(creators.fetchAnnouncementsSuccess(data));
  } catch (error) {
    console.error(error.message);
    dispatch(creators.fetchAnnouncementsFailure(error.message));
  }
};

export const fetchAnnouncementComments =
  (announcementId) => async (dispatch) => {
    dispatch(creators.fetchAnnouncementCommentsRequest(announcementId));
    try {
      const response = await fetch(
        `${DOMAIN}/announcements/${announcementId}/comments`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      dispatch(creators.fetchAnnouncementCommentsSuccess(announcementId, data));
    } catch (error) {
      console.error(error.message);
      dispatch(creators.fetchAnnouncementCommentsFailure(error.message));
    }
  };

export const addComment =
  (announcementId, comment) => async (dispatch, getState) => {
    const userId = getState().ui.getIn(['user', 'id']) || 'testId';
    dispatch(creators.addCommentRequest());
    try {
      const data = await toast.promise(
        fetch(`${DOMAIN}/announcements/${announcementId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            comment,
          }),
        }).then((response) => {
          const data = response.json();
          if (!response.ok) {
            throw new Error(data.message);
          }
          return data;
        }),
        {
          loading: 'Adding comment...',
          success: 'Your comment has been added successfully',
          error: `Failed to add the comment`,
        }
      );
      dispatch(creators.addCommentSuccess(announcementId, data));
      dispatch(creators.incrementCommentsCount(announcementId));
    } catch (error) {
      console.error(error.message);
      dispatch(creators.addCommentFailure(error.message));
    }
  };
