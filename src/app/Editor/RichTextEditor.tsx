import React from 'react';
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';

interface TinyProps {
  value: string;
  onChange: (value: string) => void;
}

const Tiny: React.FC<TinyProps> = ({ value, onChange }) => {
  return (
    <TinyMCEEditor
      apiKey="r4zdxf0q255xlsgca1moadaxj819duv82ifg52bdfkbl6v6l" // Add your TinyMCE API key here
      value={value}
      init={{
        height: 300,
        menubar: false,
        plugins: 'link image code',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
      }}
      onEditorChange={onChange} // Directly pass the value to onChange
    />
  );
};

export default Tiny;
