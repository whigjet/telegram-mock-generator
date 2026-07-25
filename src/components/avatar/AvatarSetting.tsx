import { useState, useEffect } from 'react'
import styles from './AvatarSetting.module.css'

function AvatarSetting() {
  const [avatar, setAvatar] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('userAvatar')
    if (saved) setAvatar(saved)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result) {
        const base64 = reader.result.toString()
        setAvatar(base64)
        localStorage.setItem('userAvatar', base64)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}></div>
      <div className={styles.bottom}></div>

      <label className={styles.avatarLabel}>
        {avatar ? (
          <img src={avatar} alt="Аватар" className={styles.avatarImage} />
        ) : (
          <div className={styles.avatarPlaceholder}>Загрузить</div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  )
}

export default AvatarSetting
