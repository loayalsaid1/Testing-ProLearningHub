import React, { useRef, useState, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const toolbarOptions = [
  [{ header: [] }],
  ['bold', 'italic'], // Basic text styles
  ['link', 'image'], // Links and images
  ['blockquote'],
  ['clean'], // Remove formatting
];

export default function Test() {
  const [value, setValue] = useState('<h1>asdf</h1>');
  const [files, setFiles] = useState([]);
  const quillRef = useRef(null);


  // Define the image handler function
  const handleImage = () => {
    const input = document.createElement('input');
    const quill = quillRef.current.getEditor();

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        const fileUrl = URL.createObjectURL(file);
        setFiles((prevFiles) => [...prevFiles, { file, fileUrl }]);
        const range = quill.getSelection();
const Image = ReactQuill.Quill.import("formats/image");
Image.sanitize = (url) => url;
        if (range) {
          // Insert the temporary image URL into the editor
          quill.insertEmbed(range.index, 'image', fileUrl);
          
          // Add the file to the list of images for future upload
        }
      }
    };
  };

  // Memoize the modules configuration
  const modules = useMemo(() => ({
    toolbar: {
      container: toolbarOptions,
      handlers: {
        image: handleImage,
      },
    },
  }), []);

  // Function to handle form submission
  const handleSubmit = () => {
    console.log(value);
  /**
   * replace the tmepURl in the content with a real one
    * const newValue = value;
    * loop over the files.. 
    * for each fileObj
    *  newURL = newURL
    *  value.replace(obj.tempURL, newURL)
    *  
    * 
    * get it's url and replace the ord one with the new one in the content
    */
  const placeholderImages = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/200'
  ];

    let newValue = value;
    files.forEach((fileObj, index) => {
      const newURL = placeholderImages[index];
      newValue = newValue.replace(fileObj.fileUrl, newURL);
    });

    setValue(newValue);

    console.log(value);
  };

  return (
    <div>
      <h2>Rich Text Editor</h2>
      <ReactQuill
        ref={quillRef}
        modules={modules}
        theme="snow"
        value={value}
        onChange={setValue}
      />
      <p>Editor content:</p>
      <div dangerouslySetInnerHTML={{ __html: value }} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
