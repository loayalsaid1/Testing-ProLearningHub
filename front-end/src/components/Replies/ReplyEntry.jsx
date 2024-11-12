import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { CircleArrowUp, EllipsisVertical } from 'lucide-react';
import { formatDate } from '../../utils/utilFunctions';
import { useSelector } from 'react-redux';
import { makeReplyIsUpvotedSelector, makeReplyUpvotesSelector } from '../../redux/selectors/DiscussionsSelectors';
import { toggleReplyVote } from '../../redux/actions/discussionsThunks';


export default function ReplyEntry({ content, questionId }) {
  const upvotes = useSelector(
    makeReplyUpvotesSelector(questionId, content.get('id') )
  )
  const upvoted = useSelector(
    makeReplyIsUpvotedSelector(questionId, content.get('id'))
  )
  const date = formatDate(content.get('updatedAt'));

  function toggleVote() {
    toggleReplyVote(content.get('id'), questionId);
  }

  return (
    <div data-id={content.get('id')}>
      <div>
        <img src={content.getIn(['user', 'pictureThumbnail'])} alt="Replier" />
      </div>
      <div>
        <p>{content.getIn(['user', 'name'])}</p>
        <p>{date}</p>

        <div dangerouslySetInnerHTML={{ __html: content.get('body') }} />
      </div>
      {/* side buttons */}
      <div>
        <button type="button" onClick={toggleVote}>
          {upvotes}

          {!upvoted ? (
            <CircleArrowUp color="grey" strokeWidth={2} />
          ) : (
            <CircleArrowUp color="black" strokeWidth={2.2} />
          )}
        </button>
        {/* Let the menue menu empty for now */}
        <button
          type="button"
          onClick={() => toast('options for ' + content.get('id'))}
        >
          <EllipsisVertical />
        </button>
      </div>
    </div>
  );
}
