import React, { useState } from 'react';
import { CircleArrowUp, Dot, MessagesSquare } from 'lucide-react';
import { formatDate } from '../../utils/utilFunctions';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import './css/discussionentry.css'; 

export default function DiscussionEntry({ content }) {
  const [upvoted, setUpvoted] = useState(content.get('upvoted'));

  const date = formatDate(content.get('updatedAt'));
  return (
    <div className="discussion-entry" data-id={content.get('id')}>
      <div className="discussion-entry-header">
        <img
          className="user-avatar"
          src={content.getIn(['user', 'pictureThumbnail'])}
          alt={`${content.getIn(['user', 'name'])}'s avatar`}
        />
        <div className="discussion-info">
          <h3 className="discussion-title">{content.get('title')}</h3>
          <div className="discussion-meta">
            <span className="author-name">{content.getIn(['user', 'name'])}</span>
            <Dot className="dot-separator" />
            <span className="date">{date}</span>
          </div>
        </div>
      </div>

      <div className="discussion-actions">
        <button
          className={`upvote-button ${upvoted ? 'upvoted' : ''}`}
          onClick={() => { toast(content.get('id') + ' upvoted'); setUpvoted(!upvoted); }}
        >
          {content.get('upvotes')} 
          { !upvoted 
            ? <CircleArrowUp color="grey" strokeWidth={2}/>
            : <CircleArrowUp color="black" strokeWidth={2.2}/>
          }
        </button>

        <button className="comment-button" type="button">
          <Link
            to={`/questions/${content.get('id')}`}
            state={{ backRoute: window.location.pathname }}
            className="comment-link"
          >
            {content.get('commentsCount')} <MessagesSquare />
          </Link>
        </button>
      </div>
    </div>
  );
}