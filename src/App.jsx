import { useState, useEffect, useRef } from 'react'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { ListKit } from '@tiptap/extension-list'
import { Placeholder } from '@tiptap/extensions'
import welcomeText from './components/welcomeText'
import Header from './components/Header'
import Editor from './components/Editor'
import MenuBar from './components/MenuBar'
import { FaTrashAlt } from 'react-icons/fa'
import { EditorState } from '@tiptap/pm/state' 


function App() {

  const editor = useEditor({
    extensions: [
      StarterKit,
      ListKit,
      Highlight.configure({ multicolor: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({
        placeholder: "Write something...",
      })
    ],
    content: ``,
    onUpdate: ({editor}) => {
      handleUpdateContent()
    },
  })
  

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('@notes')
    
    if (saved) return JSON.parse(saved)

    // DEFAULT TEXT
    const welcomeNote = {
      id: 'default-1',
      title: '📜 Welcome',
      content: welcomeText,
      updatedAt: Date.now()
    }
    
    return [welcomeNote]
  })

  const [activeNoteId, setActiveNoteId] = useState(null);


  useEffect(() => {
    localStorage.setItem('@notes', JSON.stringify(notes))
    
  }, [notes])

  useEffect(() => {
    if (!activeNoteId && notes.length > 0) {
      setActiveNoteId(notes[0].id);
    }
  }, [notes, activeNoteId]);

  useEffect(() => {
    if (editor && activeNoteId) {
      const currentNote = notes.find(n => n.id === activeNoteId);

      if (currentNote) {
        editor.commands.setContent(currentNote.content,false);

        const newState = EditorState.create({ // RESETAR O HISTORICO DE UNDO/REDO DO EDITOR, POIS O setContent ACIMA NAO LIMPA O HISTORICO
          doc: editor.state.doc,
          plugins: editor.state.plugins,
          schema: editor.state.schema,
        })
        editor.view.updateState(newState)
      }
      
    }
  }, [activeNoteId, editor]); 



  
  const handleUpdateContent = () => {
    if (!editor || !activeNoteId) return

    const json = editor.getJSON()
    setNotes(prev => prev.map(note => 
      note.id === activeNoteId 
        ? { ...note, content: json, updatedAt: Date.now() } 
        : note
    ))
  } 


  const activeNote = notes.find(note => note.id === activeNoteId);

  const createNote = () => {
    const newNote = {
      id: Date.now().toString(), 
      title: '',      
      content: '',    
      updatedAt: Date.now()
    }

    setNotes(prev => [newNote, ...prev])

    setActiveNoteId(newNote.id) 
  }

  useEffect(() => {
    const el = document.querySelector('.editor-scroll')

    if (!el) return

    requestAnimationFrame(() => {
      el.scrollTop = 0
    })
  }, [activeNoteId]) // FIX PARA SCROLL DO SAFARI

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    
    if (id === activeNoteId) {
      setActiveNoteId(null);
    }
  }

  const [isSidebar, setSidebar] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 640;
    }
    return true;
  });

  const toggleSidebar = () => {
    if (window.innerWidth > 1000) return;
    setSidebar(!isSidebar);
  };

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      
      <Header onToggle={toggleSidebar} isSidebar={isSidebar} />
      
      
      <div className="flex flex-1 overflow-hidden min-h-0">
        
        {isSidebar && (
        <div className="absolute inset-0 z-40  bg-main w-full mt-12 lg:mt-0 lg:relative lg:w-1/5 h-full flex flex-col border-r border-border p-2 select-none animate-in">
          <div className="flex items-center justify-between">
            <h1 className="m-2 opacity-75 ">Notes</h1>
            <button onClick={createNote} className='w-5 m-2'>+</button>
          </div>
          
          <div className="flex-1 overflow-y-auto flex flex-col gap-2 px-2 pb-22">

            {notes.map((note) => (
              <div 
                key={note.id}
                onClick={() => {setActiveNoteId(note.id); toggleSidebar();}}
                className={`w-full p-2 px-3 group rounded-md cursor-pointer transition-all flex items-center justify-between border border-transparent 
                  ${activeNoteId === note.id ? 'bg-[#ffffff1f] border-border' : 'hover:bg-[#ffffff0a]'}`}>

                <p className="truncate text-sm font-medium opacity-90"> {note.title || "Untitled"} </p>

                <button onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id)
                  }}
                  className="opacity-40 lg:opacity-0 group-hover:opacity-30 hover:opacity-90 transition-all p-1 cursor-pointer">
                    <FaTrashAlt />
                </button>
              </div> 
            ))}

            {notes.length === 0 && (
              <p className="text-xs opacity-40 text-center my-5">Nenhuma nota por aqui...</p>
            )}

            <div onClick={createNote} className="flex p-1 px-2 rounded-sm cursor-pointer transition-all  text-accent hover:bg-[#f8cb8319]">
              <p className='mx-auto'>+ Criar nova nota...</p>
            </div>

          </div>
        </div>
        )}

        <MenuBar editor={editor} />

        <div className="flex-1 overflow-y-scroll flex flex-col pb-12 pt-4 px-[10%] relative editor-scroll">
          {activeNoteId ? (
            <>
              <input
                className="text-3xl lg:text-5xl font-bold outline-none bg-transparent my-6"
                placeholder="Untitled" 
                maxlength={20}
                value={activeNote?.title || ''}
                onChange={(e) => {
                  const newTitle = e.target.value;
                  setNotes(prev => prev.map(note => 
                    note.id === activeNoteId ? { ...note, title: newTitle } : note
                  ));
                }}
              />
              <Editor editor={editor}/>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center opacity-30 transition-all text-center">
              <h2 className="text-2xl italic font-serif">"A quiet mind is a creative mind."</h2>
              <p className="mt-4">Nenhuma nota selecionada. Que tal criar algo novo?</p>
              <button 
                onClick={createNote}
                className="mt-6 px-4 py-2 border border-amber-300/50 text-accent rounded-md hover:bg-amber-300/10 transition-all"
              >
                + Criar minha primeira nota
              </button>
            </div>
          )}
        </div>


      </div>
    </div>
  )
}

export default App