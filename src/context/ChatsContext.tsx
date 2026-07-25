import { createContext, useContext, useState, useEffect } from 'react'
import { generateCountMessage } from '@/utils/generateCountMessage'
import { generateManObject } from '@/utils/generateManObject'
import { generateWomanObject } from '@/utils/generateWomanObject'
import type { personaTypes } from '@/types'

type ChatsContextType = {
  chats: personaTypes[]
  editMode: boolean
  generateChats: () => void
  clearChats: () => void
  toggleEditMode: () => void
  updateChatByIndex: (index: number, updated: Partial<personaTypes>) => void
  replaceChats: (next: personaTypes[]) => void
}

const ChatsContext = createContext<ChatsContextType | undefined>(undefined)

export const ChatsProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<personaTypes[]>([])
  const [editMode, setEditMode] = useState<boolean>(false)
  const [hasEdits, setHasEdits] = useState<boolean>(false)

  useEffect(() => {
    const saved = localStorage.getItem('chats')
    if (saved) {
      setChats(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('chats', JSON.stringify(chats))
    }
  }, [chats])

  const generateChats = () => {
    const countMessage = generateCountMessage(40, 80)
    const half = Math.floor(countMessage / 2)

    const man = generateManObject(half)
    const woman = generateWomanObject(countMessage - half)

    const shuffleArray = (array: personaTypes[]) => {
      const shuffled = [...array]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    }

    const personas = shuffleArray([...woman, ...man])
    setChats(personas)
    alert('Список чатов обновлён')
  }

  const clearChats = () => {
    setChats([])
    localStorage.removeItem('chats')
    alert('Все чаты удалены')
  }

  const updateChatByIndex = (index: number, updated: Partial<personaTypes>) => {
    setChats((prev) => {
      if (index < 0 || index >= prev.length) return prev
      const next = [...prev]
      next[index] = { ...next[index], ...updated }
      return next
    })
    setHasEdits(true)
  }

  const toggleEditMode = () => {
    setEditMode((prev) => {
      const next = !prev
      if (prev === true && next === false && hasEdits) {
        alert('Изменения сохранены')
        setHasEdits(false)
      }
      return next
    })
  }

  const replaceChats = (next: personaTypes[]) => {
    setChats(Array.isArray(next) ? next : [])
    setHasEdits(false)
    alert('Список чатов импортирован')
  }

  return (
    <ChatsContext.Provider
      value={{
        chats,
        editMode,
        generateChats,
        clearChats,
        toggleEditMode,
        updateChatByIndex,
        replaceChats,
      }}
    >
      {children}
    </ChatsContext.Provider>
  )
}

export const useChats = () => {
  const context = useContext(ChatsContext)
  if (!context) {
    throw new Error('useChats must be used inside ChatsProvider')
  }
  return context
}
