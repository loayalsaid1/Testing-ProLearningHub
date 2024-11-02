import React, {useState} from 'react';
import {CircleArrowUp, Dot, MessagesSquare} from 'lucide-react';
import { formatDate } from '../../utils/utilFunctions';
import toast from 'react-hot-toast';

export default function DiscussionEntry({ content }) {
  /**
   * id
   * usermage
   * title
   * user name
   * creation data /updatigng data
   * upvotes button.. a number and a button
   * replies buttn .. a number and a button
   */
  const [upvoted, setUpvoted] = useState(content.get('upvoted'));

  const date = formatDate(content.get('updatedAt'));
  return (
    <div id={content.get('id')}>
      <div>
        <img
          src={content.getIn(['user', 'pictureThumbnail'])}
          alt={`${content.getIn(['user', 'name'])}'s avatar`}
        />
      </div>
      <div>
        <h3>{content.get('title')}</h3>
        <div>
          <p>{content.getIn(['user', 'name'])}</p>
          <Dot />
          <p>{date}</p>
        </div>
      </div>
      <div>
        <button onClick={() => {toast(content.get('id') + 'upvoted'); setUpvoted(!upvoted)}}>
          {content.get('upvotes')} 
					{ !upvoted 
						? <CircleArrowUp color="grey" strokeWidth={2}/>
						: <CircleArrowUp color="black" strokeWidth={2.2}/>
					}
        </button>
				{/* Here should be a link to replies component for this entry */}
        <button onClick={() => toast(content.get('id') + 'replies button')}>
          {content.get('replies')} <MessagesSquare />
        </button>
      </div>
    </div>
  );
}

