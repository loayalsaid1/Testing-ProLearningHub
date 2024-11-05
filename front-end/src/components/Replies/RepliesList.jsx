import React from 'react';
import ReplyEntry from './ReplyEntry';

export default function RepliesList({ replies }) {
  return (
    <div>
      <p>
        {replies.size} repl
        {replies.size !== 1 ? 'ies' : 'y'}
      </p>
      <div>

        {replies.map((reply) => (
            <ReplyEntry content={reply} key={reply.get('id')} />
        ))}
      </div>
    </div>
  );
}
