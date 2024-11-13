import React, { useEffect, useState } from 'react';

const CreateNewLecture = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [sections, setSections] = useState([]);
  const [section, setSection] = useState('');
  const [newSection, setNewSection] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [notesOption, setNotesOption] = useState('link');
  const [notesLink, setNotesLink] = useState('');
  const [notesFile, setNotesFile] = useState(null);
  const [slidesLink, setSlidesLink] = useState('');
  const [slidesFile, setSlidesFile] = useState(null);
  const [demos, setDemos] = useState([{ name: '', link: '' }]);
  const [extras, setExtras] = useState([{ name: '', link: '' }]);
  const [slidesOption, setSlidesOption] = useState('link');

  useEffect(() => {
    setSections([
      'Section 1',
      'Section 2',
      'Section 3',
    ]);
  }, []);

  const createNewSection = () => {
    if (newSection) {
      const existingNewSection = sections.find(sec => sec === newSection);
      if (!existingNewSection) {
        setSections([...sections, newSection]);
      }

      setNewSection('');
    }
  }

  const handleRemoveDemo = (index) => {
    if (demos.length <= 1) {
      setDemos([{ name: '', link: '' }]);
    } else {
      const updatedDemos = demos.filter((_, i) => i !== index);
      setDemos(updatedDemos);
    }
  }

  const handleAddDemo = () => setDemos([...demos, { name: '', link: '' }]);
  
  const handleDemoChange = (index, field, value) => {
    const updatedDemos = demos.map((demo, i) =>
      i === index ? { ...demo, [field]: value } : demo
  );
  setDemos(updatedDemos);
};

const handleRemoveExtra = (index) => {
  if (extras.length <= 1) {
    setExtras([{ name: '', link: '' }]);
  } else {
    const filteredExtras = extras.filter((_, i) => i !== index);
    setExtras(filteredExtras);
  }
}

const handleAddExtra = () => setExtras([...extras, { name: '', link: '' }]);
  const handleExtraChange = (index, field, value) => {
    const updatedExtras = extras.map((extra, i) =>
      i === index ? { ...extra, [field]: value } : extra
    );
    setExtras(updatedExtras);
  };

  const handleMissingDemosNames = () => {
    return demos.map(demo => {
      if (!demo.name) {
        return {
          ...demo,
          name: demo.link
        };
      }
      return demo;
    })
  }

  const handleMissingExtrasNames= () => {
    return extras.map(extra => {
      return extra.name 
      ? extra
      : {...extra, name: extra.link}
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const lectureData = {
      name,
      description,
      tags: tags.split(',').map((tag) => tag.trim()),
      section: section,
      youtubeLink,
      notesLink: notesOption === 'link' ? notesLink : 'here goes uploaded file link',
      slidesLink: slidesOption === 'link' ? slidesLink : 'here goes uploaded file link',
      demos: handleMissingDemosNames(),
      extras: handleMissingExtrasNames(),
    };

    onSubmit(lectureData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Lecture Name</label>
      <input
        id='name'
        name='name'
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <hr />

      <label htmlFor="description">Description</label>
      <textarea
        id='description'
        name='description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <hr />

      <label htmlFor="tags">Tags (comma-separated)</label>
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <hr />

      <label htmlFor="section">Section</label>
      <select id='section' name='section' value={section} onChange={(e) => setSection(e.target.value)} required>
        <option value="" disabled>
          Select a section
        </option>
        {sections.map((sec, index) => (
          <option key={index} value={sec}>
            {sec}
          </option>
        ))}
      </select>
      <input
        id='newSection'
        name='newSection'
        type="text"
        placeholder="Or add a new section"
        value={newSection}
        onChange={(e) => setNewSection(e.target.value)}
      />
      <button onClick={createNewSection}>Add Section</button>
      <hr />

      <label htmlFor="videoLink">YouTube Link</label>
      <input
        id='videoLink'
        name='videoLink'
        type="url"
        value={youtubeLink}
        onChange={(e) => setYoutubeLink(e.target.value)}
      />
      <hr />

      <label>Notes</label>
      <div>
        <label>
          <input
            type="radio"
            checked={notesOption === 'link'}
            onChange={() => setNotesOption('link')}
          />
          Link
        </label>
        <label>
          <input
            type="radio"
            checked={notesOption === 'file'}
            onChange={() => setNotesOption('file')}
          />
          File
        </label>
      </div>
      {notesOption === 'link' ? (
        <input
          id='notesLink'
          name='notesFile'
          type="url"
          placeholder="Add a link"
          value={notesLink}
          onChange={(e) => setNotesLink(e.target.value)}
        />
      ) : (
        <input id='notesFile' name='notesFile' value="" type="file" onChange={(e) => setNotesFile(e.target.files[0])} />
      )}
      <hr />

      <label>Slides</label>
      <div>
        <label>
          <input
            type="radio"
            checked={slidesOption === 'link'}
            onChange={() => setSlidesOption('link')}
          />
          Link
        </label>
        <label>
          <input
            type="radio"
            checked={slidesOption === 'file'}
            onChange={() => setSlidesOption('file')}
          />
          File
        </label>
      </div>
      {slidesOption === 'link' ? (
        <input
          id='slidesLink'
          name='slidesLink'
          type="url"
          placeholder="Add a link"
          value={slidesLink}
          onChange={(e) => setSlidesLink(e.target.value)}
        />
      ) : (
        <input id='slidesFile' name='slidesFile' value="" type="file" onChange={(e) => setSlidesFile(e.target.files[0])} />
      )}
      <hr />

      <label>Demos</label>
      {demos.map((demo, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Demo name"
            value={demo.name}
            onChange={(e) => handleDemoChange(index, 'name', e.target.value)}
          />
          <input
            type="url"
            placeholder="Demo link"
            value={demo.link}
            onChange={(e) => handleDemoChange(index, 'link', e.target.value)}
          />
          <button type="button" onClick={() => handleRemoveDemo(index)}>&times;</button>
        </div>
      ))}
      <button type="button" onClick={handleAddDemo}>
        Add Demo
      </button>
      <hr />

      <label>Shorts/Extras</label>
      {extras.map((extra, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Extra name"
            value={extra.name}
            onChange={(e) => handleExtraChange(index, 'name', e.target.value)}
          />
          <input
            type="url"
            placeholder="Extra link"
            value={extra.link}
            onChange={(e) => handleExtraChange(index, 'link', e.target.value)}
          />
          <button type="button" onClick={() => handleRemoveExtra(index)}>&times;</button>
        </div>
      ))}
      <button type="button" onClick={handleAddExtra}>
        Add Extra
      </button>
      <hr />

      <button type="submit">Create Lecture</button>
    </form>
  );
};

export default CreateNewLecture;
