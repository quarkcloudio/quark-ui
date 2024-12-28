import React, { useState } from 'react';
import { post } from '@/services/action';
import { Editor } from '@tinymce/tinymce-react';
import ImageBox from '@/components/ImageBox';

export interface EditorPageProps {
  height?: any;
  width?: any;
  fileUploadAction?: any;
  imageUploadAction?: any;
  value?: any;
  onChange?: (value: any) => void;
}

const defaultProps = {
  height: 500,
  width: '100%',
  fileUploadAction: '/api/admin/upload/file/handle',
  imageUploadAction: '/api/admin/upload/image/handle',
} as EditorPageProps;

const EditorPage: React.FC<EditorPageProps> = (props) => {
  const {
    height,
    width,
    fileUploadAction,
    imageUploadAction,
    value,
    onChange,
  } = {
    ...defaultProps,
    ...props,
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tinymceEditor, setTinymceEditor] = useState({
    insertContent(value: any) {
      return value;
    },
  });

  const triggerChange = (changedValue: any) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const onEditorChange = (content: any) => {
    triggerChange(content);
  };

  const insertImages = (items: any) => {
    if (tinymceEditor && items) {
      let html = '';
      items.forEach((item: any) => {
        html = html + '<img src="' + item.url + '" />';
      });
      tinymceEditor.insertContent(html);
    }
  };

  const editorExecCommand = (content: any, editor: any) => {
    if (content.command === 'mceFocus') {
      setTinymceEditor(editor);
    }
    if (content.command === 'RemoveFormat') {
      editor.execCommand('unlink');
      editor.execCommand('FormatBlock', false, 'p');
    }
    if (sessionStorage['editorCommand'] === 'multipleimage') {
      setIsModalOpen(true);
      sessionStorage.removeItem('editorCommand');
    }
  };

  const onPaste = async (e: any) => {
    if (tinymceEditor) {
      const clipboardData = e.clipboardData || (window as any).clipboardData;
      // 剪贴板图片获取并上传
      if (clipboardData.items) {
        const items = clipboardData.items;
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            // Safari 浏览器阻止默认事件，防止粘贴Blob文件到编辑器
            if (
              /Safari/.test(navigator.userAgent) &&
              !/Chrome/.test(navigator.userAgent)
            ) {
              e.preventDefault();
            }
            const file = items[i].getAsFile();
            // 上传图片到服务器
            const formData = new FormData();
            formData.append('file', file);
            const result = await post({
              url: imageUploadAction,
              data: formData,
            });
            if (result.type === 'success') {
              const html = '<img src="' + result.data.url + '" />';
              // 插入图片到编辑器
              tinymceEditor.insertContent(html);
            }
          }
        }
      }
    }
  };

  return (
    <>
      <ImageBox
        open={isModalOpen}
        onCancel={(e) => setIsModalOpen(false)}
        onOk={(value: any) => {
          setIsModalOpen(false);
          insertImages(value);
        }}
      />
      <Editor
        value={value}
        onEditorChange={onEditorChange}
        onPaste={onPaste}
        init={{
          language: 'zh_CN',
          height: height ? height : 500,
          width: width ? width : '100%',
          plugins: [
            'advlist autolink lists link charmap print preview anchor image',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount multipleimage formatpainter indent2em',
          ],
          menu: {
            insert: {
              title: '插入',
              items:
                'multipleimage link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime',
            },
          },
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist indent2em outdent indent | removeformat formatpainter | help',
          fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
          font_formats:
            "微软雅黑='微软雅黑';宋体='宋体';楷体='楷体';黑体='黑体';隶书='隶书';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
          relative_urls: false,
          remove_script_host: true,
          file_picker_callback: function (callback, value, meta) {
            //文件分类
            let filetype =
              '.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4';
            //后端接收上传文件的地址
            let upurl = fileUploadAction;
            //为不同插件指定文件类型及后端地址
            switch (meta.filetype) {
              case 'image':
                filetype = '.jpg, .jpeg, .png, .gif';
                upurl = imageUploadAction;
                break;
              case 'media':
                filetype = '.mp3, .mp4';
                upurl = fileUploadAction;
                break;
              case 'file':
              default:
            }
            //模拟出一个input用于添加本地文件
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', filetype);
            input.click();
            input.onchange = function () {
              if (input.files !== null) {
                const file = input.files[0];
                const xhr: any = new XMLHttpRequest();
                xhr.withCredentials = false;
                xhr.open('POST', upurl);
                xhr.setRequestHeader(
                  'authorization',
                  'Bearer ' + localStorage['token'],
                );
                xhr.onload = function () {
                  if (xhr.status !== 200) {
                    alert('HTTP Error: ' + xhr.status);
                    return;
                  }
                  const result = JSON.parse(xhr.responseText);
                  if (result.type === 'error') {
                    alert(result.content);
                    return;
                  }
                  callback(result.data.url, {
                    text: result.data.name,
                    title: result.data.name,
                  });
                };
                const formData = new FormData();
                formData.append('file', file, file.name);
                xhr.send(formData);
              }
            };
          },
        }}
        onExecCommand={editorExecCommand}
      />
    </>
  );
};

export default EditorPage;
