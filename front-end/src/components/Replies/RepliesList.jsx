import React from 'react';
import ReplyEntry from './ReplyEntry';

export default function RepliesList({ replies }) {
  return (
    <div>
      <p>
        {replies.size} repl
        {replies.size !== 1 ? 'ies' : 'y'}
      </p>
      <ul>
        {replies.map((reply) => (
          <li key={reply.get('id')}>
            <ReplyEntry content={reply} />
          </li>
        ))}
      </ul>
    </div>
  );
}

