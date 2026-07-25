import SettingsButton from '@/components/settingsButton/SettingButton'
import { IoReloadCircleOutline } from 'react-icons/io5'
import { MdDeleteForever } from 'react-icons/md'
import { FaFileExport, FaFileImport } from 'react-icons/fa'
import { useChats } from '@/context/ChatsContext'
import styles from './ButtonList.module.css'

function ButtonList() {
  const { generateChats, clearChats, replaceChats, chats } = useChats()

  const exportChats = () => {
    const blob = new Blob([JSON.stringify(chats, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'chats.json'
    a.click()
    URL.revokeObjectURL(url)
    alert('Список чатов экспортирован')
  }

  const importChats = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'
    input.onchange = () => {
      const file = input.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result))
          if (!Array.isArray(parsed)) throw new Error('Некорректный формат файла')
          const valid = parsed.every(
            (i: any) =>
              typeof i?.avatar === 'string' &&
              typeof i?.name === 'string' &&
              typeof i?.message === 'string' &&
              typeof i?.time === 'string',
          )
          if (!valid) throw new Error('Отсутствуют обязательные поля')
          replaceChats(parsed)
        } catch (e: any) {
          alert(`Ошибка импорта: ${e.message ?? e}`)
        }
      }
      reader.readAsText(file, 'utf-8')
    }
    input.click()
  }

  return (
    <div className={styles.buttonList}>
      <SettingsButton
        icon={<IoReloadCircleOutline color="green" />}
        title="Обновить список чатов"
        onClick={generateChats}
      />
      <SettingsButton
        icon={<MdDeleteForever color="red" />}
        title="Удалить все чаты"
        onClick={clearChats}
      />
      <SettingsButton icon={<FaFileImport />} title="Импорт чатов из JSON" onClick={importChats} />
      <SettingsButton icon={<FaFileExport />} title="Экспорт чатов в JSON" onClick={exportChats} />
    </div>
  )
}

export default ButtonList
