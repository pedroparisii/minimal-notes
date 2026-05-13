import { useState } from 'react'
import { useEditorState } from '@tiptap/react'
import {FaBold, FaItalic, FaListUl, FaListOl, FaTasks, FaHeading, FaStrikethrough, FaQuoteLeft, FaCode, FaTerminal, FaUnderline, FaHighlighter, FaLink, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify } from 'react-icons/fa'

import { menuBarStateSelector } from './MenuBarState'
import { IoMdReturnLeft, IoMdReturnRight } from "react-icons/io";

function MenuBar({ editor }) {
  const state = useEditorState({
    editor,
    selector: menuBarStateSelector,
  })

  if (!editor || !state) return null

  const [activeMenu, setActiveMenu] = useState(false);
  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName)
  }

  return (
    <div className="hidden lg:flex w-15 flex-col gap-1 items-center justify-center MenuBar">

      <button onClick={() => editor.chain().focus().undo().run()} disabled={!state.canUndo} className="buttonStyle">
        <IoMdReturnLeft />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} disabled={!state.canRedo} className="buttonStyle">
        <IoMdReturnRight />
      </button>

      <hr className='w-1/2 opacity-20 my-1'/>

      {/* HEADINGS */}
      <div className="relative">
      <button onClick={() => toggleMenu('headings')} className={`buttonStyle ${activeMenu === 'headings' ? 'is-active' : ''}`}>
        <FaHeading />
      </button>
      {activeMenu === 'headings' && (
        <div className="absolute z-10 p-1.5 border-border border bg-[#1a1a1a] rounded-md left-11 top-0 animate-in">
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <button 
                key={level} 
                onClick={() => { 
                  editor.chain().focus().toggleHeading({ level }).run()
                  setActiveMenu(null)
                }}
                className={`buttonStyle ${editor.isActive('heading', { level }) ? 'is-active' : ''}`}
              >
              H{level}
            </button>
          ))}
        </div>
      )}
      </div>

      {/* LISTAS */}
      <div className="relative">
      <button onClick={() => toggleMenu('lists')} className={`buttonStyle ${activeMenu === 'lists' ? 'is-active' : ''}`}>
        <FaListUl />
      </button>
      {activeMenu === 'lists' && (
        <div className="absolute z-10 p-1.5 border-border border bg-[#1a1a1a] rounded-md left-11 top-0 animate-in">
          <button onClick={() => { editor.chain().focus().toggleBulletList().run(); setActiveMenu(null); }} className={`buttonStyle ${state.isBullet ? 'is-active' : ''}`}><FaListUl /></button>
          <button onClick={() => { editor.chain().focus().toggleOrderedList().run(); setActiveMenu(null); }} className={`buttonStyle ${state.isOrdered ? 'is-active' : ''}`}><FaListOl /></button>
          <button onClick={() => { editor.chain().focus().toggleTaskList().run(); setActiveMenu(null); }} className={`buttonStyle ${state.isTask ? 'is-active' : ''}`}><FaTasks /></button>
        </div>
      )}
      </div>

      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`buttonStyle ${state.isQuote ? 'is-active' : ''}`}>
        <FaQuoteLeft />
      </button>

      <hr className='w-1/2 opacity-20 my-1'/>

      {/* ESTILO DE TEXTO */}
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={`buttonStyle ${state.isBold ? 'is-active' : ''}`}><FaBold /></button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`buttonStyle ${state.isItalic ? 'is-active' : ''}`}><FaItalic /></button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`buttonStyle ${state.isStrike ? 'is-active' : ''}`}><FaStrikethrough /></button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`buttonStyle ${state.isUnderline ? 'is-active' : ''}`}><FaUnderline /></button>
      <button onClick={() => editor.chain().focus().toggleCode().run()} className={`buttonStyle ${state.isCode ? 'is-active' : ''}`}><FaCode /></button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`buttonStyle ${state.isCodeBlock ? 'is-active' : ''}`}><FaTerminal /></button>
      <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={`buttonStyle ${state.isHighlight ? 'is-active' : ''}`}><FaHighlighter /></button>

      <hr className='w-1/2 opacity-20 my-1'/>

      {/* ALINHAMENTO */}
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`buttonStyle ${state.isAlignLeft ? 'is-active' : ''}`}><FaAlignLeft /></button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`buttonStyle ${state.isAlignCenter ? 'is-active' : ''}`}><FaAlignCenter /></button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`buttonStyle ${state.isAlignRight ? 'is-active' : ''}`}><FaAlignRight /></button>
      <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={`buttonStyle ${state.isAlignJustify ? 'is-active' : ''}`}><FaAlignJustify /></button>
    </div>
  )
}

export default MenuBar