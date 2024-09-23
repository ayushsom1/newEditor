import React, { useRef, useEffect, useImperativeHandle, forwardRef, useParams } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './TextEditor.css'; // Ensure to import the CSS styles

const TextEditor = forwardRef(({ initialContent = '', onSave }, ref) => {
  const editorRef = useRef(null);
  const previewRef = useRef(null);
  const printIframeRef = useRef(null);
  const [tableFormVisible, setTableFormVisible] = React.useState(false);
  const [tableRows, setTableRows] = React.useState(3);
  const [tableCols, setTableCols] = React.useState(3);
  

  // Expose insertImage method to parent via ref
  useImperativeHandle(ref, () => ({
    insertImage(imageSrc) {
      document.execCommand('insertImage', false, imageSrc);
      updatePreview();
    }
  }));

  // Initialize editor content on mount and when initialContent changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent || '<p>Start typing your content here...</p>';
      updatePreview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialContent]);

  // Update preview whenever content changes
  const updatePreview = () => {
    if (previewRef.current && editorRef.current) {
      previewRef.current.innerHTML = editorRef.current.innerHTML;
    }
  };

  const handleInput = () => {
    updatePreview();
  };

  const undo = () => {
    document.execCommand('undo');
    updatePreview();
  };

  const redo = () => {
    document.execCommand('redo');
    updatePreview();
  };

  const applyStyle = (command, value = null) => {
    if (command === 'fontName' && !value) return; // Prevent applying empty font
    if (command === 'fontSize' && !value) return; // Prevent applying empty size
    document.execCommand(command, false, value);
    updatePreview();
  };

  const performAction = (action) => {
    if (['cut', 'copy', 'paste'].includes(action)) {
      if (navigator.clipboard) {
        handleClipboardAction(action);
      } else {
        document.execCommand(action);
      }
    } else {
      document.execCommand(action);
    }
    updatePreview();
  };

  const handleClipboardAction = async (action) => {
    try {
      if (action === 'cut') {
        await navigator.clipboard.writeText(window.getSelection().toString());
        document.execCommand('delete');
      } else if (action === 'copy') {
        await navigator.clipboard.writeText(window.getSelection().toString());
      } else if (action === 'paste') {
        const text = await navigator.clipboard.readText();
        document.execCommand('insertText', false, text);
      }
    } catch (err) {
      console.error('Failed to execute clipboard action:', err);
      document.execCommand(action);
    }
    updatePreview();
  };

  const showTableForm = () => {
    setTableFormVisible(true);
  };

  const closeTableForm = () => {
    setTableFormVisible(false);
  };

  const insertTable = () => {
    let tableHtml = '<table><tbody>';
    for (let i = 0; i < tableRows; i++) {
      tableHtml += '<tr>';
      for (let j = 0; j < tableCols; j++) {
        tableHtml += '<td>Cell</td>';
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</tbody></table>';
    document.execCommand('insertHTML', false, tableHtml);
    updatePreview();
    closeTableForm();
  };

  const saveContent = () => {
    const content = editorRef.current.innerHTML;
    console.log('Saving content:', content);
    if (onSave) {
      onSave(content);
    }
    // Implement your save logic here, e.g., send to backend
  };

  const printContent = () => {
    const content = editorRef.current.innerHTML;
    const iframe = printIframeRef.current;
    const iframeWindow = iframe.contentWindow || iframe;
    const iframeDocument = iframe.contentDocument || iframeWindow.document;

    iframeDocument.open();
    iframeDocument.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Report</title>
          <style>
            body { 
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
            }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);
    iframeDocument.close();

    iframeWindow.focus();
    setTimeout(() => {
      iframeWindow.print();
    }, 250);
  };

  return (
    <div className="container">
      <div className="editor-container">
        <div className="toolbar">
          <button onClick={() => performAction('cut')} title="Cut">
            <i className="fas fa-cut"></i>
          </button>
          <button onClick={() => performAction('copy')} title="Copy">
            <i className="fas fa-copy"></i>
          </button>
          <button onClick={() => performAction('paste')} title="Paste">
            <i className="fas fa-paste"></i>
          </button>
          <button onClick={undo} title="Undo"><i className="fas fa-undo"></i></button>
          <button onClick={redo} title="Redo"><i className="fas fa-redo"></i></button>
          <select onChange={(e) => applyStyle('fontName', e.target.value)} defaultValue="">
            <option value="" disabled>Font</option>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
          </select>
          <select onChange={(e) => applyStyle('fontSize', e.target.value)} defaultValue="">
            <option value="" disabled>Size</option>
            <option value="1">8</option>
            <option value="2">10</option>
            <option value="3">12</option>
            <option value="4">14</option>
            <option value="5">18</option>
            <option value="6">24</option>
            <option value="7">36</option>
          </select>
          <button onClick={() => applyStyle('bold')} title="Bold"><i className="fas fa-bold"></i></button>
          <button onClick={() => applyStyle('italic')} title="Italic"><i className="fas fa-italic"></i></button>
          <button onClick={() => applyStyle('underline')} title="Underline"><i className="fas fa-underline"></i></button>
          <button onClick={() => applyStyle('strikeThrough')} title="Strikethrough"><i className="fas fa-strikethrough"></i></button>
          <button onClick={() => applyStyle('justifyLeft')} title="Align Left"><i className="fas fa-align-left"></i></button>
          <button onClick={() => applyStyle('justifyCenter')} title="Align Center"><i className="fas fa-align-center"></i></button>
          <button onClick={() => applyStyle('justifyRight')} title="Align Right"><i className="fas fa-align-right"></i></button>
          <button onClick={() => applyStyle('justifyFull')} title="Justify"><i className="fas fa-align-justify"></i></button>
          <button onClick={showTableForm} title="Insert Table"><i className="fas fa-table"></i></button>
          <button onClick={() => applyStyle('insertOrderedList')} title="Ordered List"><i className="fas fa-list-ol"></i></button>
          <button onClick={() => applyStyle('insertUnorderedList')} title="Unordered List"><i className="fas fa-list-ul"></i></button>
          <button onClick={() => {
            const pageBreak = document.createElement('div');
            pageBreak.style.pageBreakAfter = 'always';
            pageBreak.style.borderBottom = '1px dotted #000';
            const range = window.getSelection().getRangeAt(0);
            range.insertNode(pageBreak);
          }} title="Insert Page Break"><i className="fas fa-file-alt"></i></button>
         <button 
            onClick={printContent} 
            className="p-1 hover:bg-gray-200 rounded" 
            title="Print"
          >
            <i className="fas fa-print"></i>
          </button>
          {/* <button onClick={handleInsertChart} title="Insert Chart">
            <i className="fas fa-chart-bar"></i>
          </button>
          <button onClick={saveContent} title="Save">
            <i className="fas fa-save"></i>
          </button>
          <button onClick={submitForReview} title="Submit for Review">
            <i className="fas fa-paper-plane"></i>
          </button> */}
        </div>
        <div
          className="editor-content"
          contentEditable="true"
          ref={editorRef}
          onInput={handleInput}
          suppressContentEditableWarning={true}
        ></div>
        <button className="save-button" onClick={saveContent}>Save</button>
      </div>
      <div className="preview-container">
        <h2 style={{ textAlign: 'center' }}>Preview</h2>
        <div className="preview-content" ref={previewRef}></div>
      </div>

      {tableFormVisible && (
        <div id="tableForm" className="table-form">
          <h3>Insert Table</h3>
          <div className="form-group">
            <label htmlFor="rows">Rows:</label>
            <input
              type="number"
              id="rows"
              min="1"
              max="10"
              value={tableRows}
              onChange={(e) => setTableRows(parseInt(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cols">Columns:</label>
            <input
              type="number"
              id="cols"
              min="1"
              max="10"
              value={tableCols}
              onChange={(e) => setTableCols(parseInt(e.target.value))}
            />
          </div>
          <div className="button-group">
            <button className="insert-button" onClick={insertTable}>Insert</button>
            <button className="close-button" onClick={closeTableForm}>Close</button>
          </div>
        </div>
      )}
      <iframe 
        ref={printIframeRef} 
        style={{display: 'none'}} 
        title="Print Frame"
      />
    </div>
  );
});

export default TextEditor;

