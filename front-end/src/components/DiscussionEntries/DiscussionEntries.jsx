import React, { useState } from 'react';
import DiscussionEntry from './DiscussionEntry';

/**
 * Component that renders a paginated list of DiscussionEntry components.
 * Being it for a lecture or general discussion.
 *
 * @param {Immutable.List} entries
 *   The list of discussion entries to render
 * @param {number} chunkSize
 *   The number of entries to render at a time
 *
 * @return {React.ReactElement}
 */
export default function DiscussionEntries({ entries, chunkSize }) {
	const [limit, setLimit] = useState(chunkSize);

  return (
    <>
      {!entries || !entries.size ? (
        <>
          <h2> No Discussion entries Yet..</h2>
          <p>Feel free to add one...</p>
        </>
      ) : (
        <div>
          {entries.slice(0, limit).map((entry, index) => (
            <DiscussionEntry key={index} content={entry} />
          ))}
          {limit < entries.size && (
            <button type="button" onClick={() => setLimit(limit + chunkSize)}>
              See more
            </button>
          )}
          {limit > chunkSize && (
            <button type="button" onClick={() => setLimit(limit - chunkSize)}>
              See less
            </button>
          )}
        </div>
      )}
    </>
  );
}

