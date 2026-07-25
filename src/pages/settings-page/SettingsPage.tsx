import styles from './SettingsPage.module.css'
import ButtonList from '@/features/settingsButtonsList/ButtonList'

import AvatarSetting from '@/components/avatar/AvatarSetting'
import NavBar from '@/features/navBar/NavBar'

function SettingsPage() {
  return (
    <div className={styles.settingsPage}>
      <div className={styles.settingsPage_avatar}>
        <AvatarSetting />
      </div>
      <div className={styles.settingsPage_content}>
        <h1 className={styles.settingsPage_title}>Настройки</h1>
        <ButtonList />
      </div>
      <NavBar />
    </div>
  )
}

export default SettingsPage
