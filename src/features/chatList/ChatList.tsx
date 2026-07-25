import ChatItem from '@/components/chatItem/ChatItem'
import styles from './ChatList.module.css'
import { useChats } from '@/context/ChatsContext'

function ChatList() {
  const { chats, generateChats } = useChats()

  if (chats.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyState__icon}></div>
        <h2 className={styles.emptyState__title}>Список чатов пуст</h2>
        <p className={styles.emptyState__subtitle}>Начни работу с приложением за 3 простых шага:</p>

        <ol className={styles.emptyState__steps}>
          <li>
            <span className={styles.step__number}>1</span>
            <div className={styles.step__content}>
              <strong>Добавь на главный экран</strong>
              <span>
                В браузере нажми <em>«Поделиться»</em> → <em>«На экран Домой»</em>. Приложение будет
                работать как обычное, даже без интернета.
              </span>
            </div>
          </li>
          <li>
            <span className={styles.step__number}>2</span>
            <div className={styles.step__content}>
              <strong>Сгенерируй чаты</strong>
              <span>
                Перейди в <em>Настройки</em> → <em>«Обновить список чатов»</em>. Приложение создаст
                реалистичные диалоги автоматически.
              </span>
            </div>
          </li>
          <li>
            <span className={styles.step__number}>3</span>
            <div className={styles.step__content}>
              <strong>Редактируй и экспортируй</strong>
              <span>
                Нажми <em>«Изм.»</em> в шапке, чтобы изменить любой чат. Готовые скриншоты можно
                использовать для кейсов и портфолио.
              </span>
            </div>
          </li>
        </ol>

        <button className={styles.emptyState__button} onClick={generateChats}>
          Сгенерировать чаты
        </button>
      </div>
    )
  }

  return (
    <div className={styles.chatList}>
      {chats.map((p, i) => (
        <ChatItem
          key={i}
          index={i}
          avatar={p.avatar}
          name={p.name}
          lastMessage={p.message}
          date={p.time}
        />
      ))}
    </div>
  )
}

export default ChatList
