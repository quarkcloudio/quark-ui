import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

export default function App() {
  const editorRef = useRef<any>(null);
  return (
    <Editor
      licenseKey="gpl"
      init={{
        branding: false,
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        height: 500,
        language: 'zh_CN',
        menubar: false,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'preview',
          'help',
          'wordcount'
        ],
        promotion: false,
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help'
      }}
      onInit={(_evt, editor) => (editorRef.current = editor)}
    />
  );
}
