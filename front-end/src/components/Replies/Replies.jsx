import React, { useState } from 'react';
import { CircleArrowUp, Dot, EllipsisVertical } from 'lucide-react';
import TextEditor from '../TextEditor/TextEditor';

export default function Replies() {
  const [showQuestionEditor, setShowQuestionEditor] = useState(false);

  return (
    <>
      {/* Back button */}
      <button type="button">Back to all questions</button>

      {/* Question part */}
      <div>
        <img
          src="https://picsum.photos/50"
          width="50"
          height="50"
          alt="Questioner image"
        />
      </div>
      <div>
        <h3>Question title</h3>
        <p>
          Questioner Name <Dot /> X days ago
        </p>
        <div>Question Text</div>
      </div>
      <div>
        <button type="button">
          12 <CircleArrowUp />
        </button>
        <button type="button">
          <EllipsisVertical />
        </button>
      </div>

      {/* Replies part */}
      <div>
        <p>3 Replies</p>
        {/* Replie entry */}
        <div>
          <div>
            <img
              src="https://picsum.photos/50"
              width="50"
              height="50"
              alt="Replier's image"
            />
          </div>
          <div>
            <p>Replier's Name</p>
            <p>X days ago</p>

            <div>
              Question Text Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Fugiat, porro. Dolorem labore aut dolor omnis.
            </div>
          </div>
          {/* side buttons */}
          <div>
            <button type="button">
              12 <CircleArrowUp />
            </button>
            <button type="button">
              <EllipsisVertical />
            </button>
          </div>
        </div>
        <div>
          <div>
            <img
              src="https://picsum.photos/50"
              width="50"
              height="50"
              alt="Replier's image"
            />
          </div>
          <div>
            <p>Replier's Name</p>
            <p>X days ago</p>

            <div>
              Question Text Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Fugiat, porro. Dolorem labore aut dolor omnis.
            </div>
          </div>
          {/* side buttons */}
          <div>
            <button type="button">
              12 <CircleArrowUp />
            </button>
            <button type="button">
              <EllipsisVertical />
            </button>
          </div>
        </div>
        <div>
          <div>
            <img
              src="https://picsum.photos/50"
              width="50"
              height="50"
              alt="Replier's image"
            />
          </div>
          <div>
            <p>Replier's Name</p>
            <p>X days ago</p>

            <div>
              Question Text Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Fugiat, porro. Dolorem labore aut dolor omnis.
            </div>
          </div>
          {/* side buttons */}
          <div>
            <button type="button">
              12 <CircleArrowUp />
            </button>
            <button type="button">
              <EllipsisVertical />
            </button>
          </div>
        </div>
      </div>

      {/* Reply section */}
      {!showQuestionEditor ? (
        <div>
          <img
            src="https://picsum.photos/50"
            width="50"
            height="50"
            alt="user's image"
          />
          <input type='text' id='reply' name='reply' placeholder='Add your comment here...' onClick={() => setShowQuestionEditor(true)} />
        </div>
      ) : (
        <h3> Handle adding response here</h3>
      )}
    </>
  );
}
