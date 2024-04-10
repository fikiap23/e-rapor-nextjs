import React, { useState } from 'react'
import { Card, Row, Col } from 'antd'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './index.css'

const RichTextEditor = ({ onChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
    if (onChange) {
      onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }
  }

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
      toolbar={{
        options: ['inline', 'list', 'textAlign', 'history'],
      }}
    />
  )
}

export default RichTextEditor
