import React, { useState, useEffect } from 'react'
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './index.css'

const RichTextEditor = ({ onChange, initialData }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    if (initialData) {
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(initialData))
        )
      )
    }
  }, [initialData])

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
