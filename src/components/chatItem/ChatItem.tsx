import styles from './ChatItem.module.css'
import { generateCountMessage } from '@/utils/generateCountMessage'
import { useChats } from '@/context/ChatsContext'
import { manAvatar, womanAvatar } from '@/data/chatData'
import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

function getInitials(fullName: string): string {
  const tokens = fullName.trim().split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return ''
  if (tokens.length === 1) return tokens[0][0]?.toUpperCase() ?? ''
  return `${tokens[0][0]?.toUpperCase() ?? ''}${tokens[1][0]?.toUpperCase() ?? ''}`
}

function stringToGradient(seed: string): string {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
    hash |= 0
  }
  const hue = Math.abs(hash) % 360
  const lightTop = 70
  const lightBottom = 45
  const saturation = 65
  return `linear-gradient(180deg, hsl(${hue}, ${saturation}%, ${lightTop}%) 0%, hsl(${hue}, ${saturation}%, ${lightBottom}%) 100%)`
}

type ChatItemProps = {
  index: number
  avatar: string
  name: string
  lastMessage: string
  date: string
}

function ChatItem({ index, avatar, name, lastMessage, date }: ChatItemProps) {
  const { editMode, updateChatByIndex } = useChats()
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false)
  const allAvatars = useMemo(() => [...womanAvatar, ...manAvatar], [])

  const startEdit = () => {
    if (!editMode) return
    setIsPickerOpen(true)
  }

  const onPickAvatar = (chosen: string) => {
    setIsPickerOpen(false)
    const newName = prompt('Изменить имя', name)?.trim()
    if (newName === undefined) return
    const newMessage = prompt('Изменить сообщение', lastMessage)?.trim()
    if (newMessage === undefined) return
    const newDate = prompt('Изменить дату (напр. 15.05)', date)?.trim()
    if (newDate === undefined) return

    updateChatByIndex(index, {
      name: newName || name,
      avatar: chosen,
      message: newMessage || lastMessage,
      time: newDate || date,
    })
  }

  return (
    <div
      className={styles.chatItem}
      onClick={startEdit}
      style={
        editMode
          ? { outline: '2px dashed #2a85ff', borderRadius: '16px', cursor: 'pointer' }
          : undefined
      }
    >
      <div className={styles.avatar}>
        {avatar ? (
          <img src={avatar} alt="" />
        ) : (
          <div className={styles.avatarFallback} style={{ background: stringToGradient(name) }}>
            {getInitials(name)}
          </div>
        )}
      </div>
      <div className={styles.chatName_container}>
        <div className={styles.chatName_container_left_block}>
          <p className={styles.chatNameText}>{name}</p>
          <p className={styles.lastMessageText}>{lastMessage}</p>
        </div>
        <div className={styles.chatName_container_right_block}>
          <p className={styles.dateText}>{date}</p>
          <div className={styles.countMessage_circle}>
            <span>{generateCountMessage(1, 5)}</span>
          </div>
        </div>
      </div>
      {isPickerOpen &&
        createPortal(
          <div className={styles.pickerOverlay} onClick={() => setIsPickerOpen(false)}>
            <div className={styles.pickerModal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.pickerHeader}>
                <p className={styles.pickerTitle}>Выберите аватар</p>
                <button className={styles.pickerClose} onClick={() => setIsPickerOpen(false)}>
                  ✕
                </button>
              </div>
              <div className={styles.pickerGrid}>
                <button
                  className={styles.pickerItem}
                  onClick={() => onPickAvatar(avatar)}
                  aria-label="Текущий аватар"
                  title="Текущий аватар"
                >
                  <div
                    className={styles.avatarFallback}
                    style={{ background: stringToGradient(name) }}
                  >
                    {avatar ? <img src={avatar} alt="" /> : null}
                  </div>
                </button>
                <button
                  className={styles.pickerItem}
                  onClick={() => onPickAvatar('')}
                  aria-label="Без аватара"
                  title="Без аватара"
                >
                  <div
                    className={styles.avatarFallback}
                    style={{ background: stringToGradient(name) }}
                  >
                    {getInitials(name)}
                  </div>
                </button>
                {allAvatars.map((src) => (
                  <button
                    key={src}
                    className={styles.pickerItem}
                    onClick={() => onPickAvatar(src)}
                    aria-label="Выбрать аватар"
                    title="Выбрать аватар"
                  >
                    <img src={src} alt="avatar" />
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}

export default ChatItem
