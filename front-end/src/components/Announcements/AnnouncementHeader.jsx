import React from 'react';
import { Minus, Dot } from 'lucide-react';

export default function AnnouncementHeader({ content }) {
  const announcementBody =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, laboriosam, aliquam dignissimos consectetur nam repellat quidem at enim molestiae rem, sed doloremque ex cupiditate. Voluptatibus sapiente amet possimus quibusdam placeat!';
  return (
    <div>
      <div>
        <img src="https://picsum.photos/100" alt="Announcer" />
        <p>
          <strong>Announcer Name</strong> <Minus /> Rule{' '}
        </p>
        <p>
          Posted an announcement <Dot /> 3 days ago
        </p>
      </div>

      <div>
        <h4>This is the title of the announcement</h4>
        <div
          dangerouslySetInnerHTML={{
            __html: announcementBody,
          }}
        />
      </div>
    </div>
  );
}
