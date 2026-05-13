export function menuBarStateSelector(ctx) {
  if (!ctx.editor) return {}

  const { editor } = ctx

  return {
    isBold: editor.isActive('bold'),
    canBold: editor.can().toggleBold(),
    isItalic: editor.isActive('italic'),
    canItalic: editor.can().toggleItalic(),
    isStrike: editor.isActive('strike'),
    canStrike: editor.can().toggleStrike(),
    isUnderline: editor.isActive('underline'),
    canUnderline: editor.can().toggleUnderline(),
    
    isCode: editor.isActive('code'),
    isCodeBlock: editor.isActive('codeBlock'),
    isQuote: editor.isActive('blockquote'),
    isHighlight: editor.isActive('highlight'),
    isLink: editor.isActive('link'),
    
    isBullet: editor.isActive('bulletList'),
    isOrdered: editor.isActive('orderedList'),
    isTask: editor.isActive('taskList'),

    isHeading1: editor.isActive('heading', { level: 1 }),
    isHeading2: editor.isActive('heading', { level: 2 }),
    isHeading3: editor.isActive('heading', { level: 3 }),
    isHeading4: editor.isActive('heading', { level: 4 }),
    isHeading5: editor.isActive('heading', { level: 5 }),
    isHeading6: editor.isActive('heading', { level: 6 }),

    isAlignLeft: editor.isActive({ textAlign: 'left' }),
    isAlignCenter: editor.isActive({ textAlign: 'center' }),
    isAlignRight: editor.isActive({ textAlign: 'right' }),
    isAlignJustify: editor.isActive({ textAlign: 'justify' }),

    canUndo: editor.can().undo(),
    canRedo: editor.can().redo(),
  }
}