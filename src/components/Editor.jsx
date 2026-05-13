import { useEditor, EditorContent } from '@tiptap/react'

import '../index.css'

function Editor({ editor }) {
  if (!editor) return null

  return (<EditorContent editor={editor} />)
}

export default Editor