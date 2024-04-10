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
    <div>
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

      <br />
      <Row gutter={10}>
        <Col span={12}>
          <Card
            title="Convert HTML synchronously"
            bordered={false}
            style={{ minHeight: 200 }}
          >
            {editorState &&
              draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default RichTextEditor
