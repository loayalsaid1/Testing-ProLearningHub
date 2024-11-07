import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { CircleArrowUp, EllipsisVertical } from 'lucide-react';
import { formatDate } from '../../utils/utilFunctions';

export default function ReplyEntry({ content }) {
  const date = formatDate(content.get('updatedAt'));
  // This should be comming fomr the reponse already;
  const [upvoted, setUpvoted] = useState(content.get('upvoted') || false);

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
        <button type="button" onClick={() => setUpvoted(!upvoted)}>
          {content.get('upvotes')}

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
