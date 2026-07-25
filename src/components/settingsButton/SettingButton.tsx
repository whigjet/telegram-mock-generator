import React from 'react'
import styles from './SettingsButton.module.css'
import type { buttonTypes } from '@/types'
import { FaAngleRight } from 'react-icons/fa'

function SettingsButton({ icon, title, onClick }: buttonTypes): React.JSX.Element {
  return (
    <div className={styles.settingsButton} onClick={onClick}>
      <div className={styles.settingsButton_flexStart}>
        <div className={styles.settingsButton_icon}>{icon}</div>
        <h1 className={styles.settingsButton_title}>{title}</h1>
      </div>
      <FaAngleRight />
    </div>
  )
}

export default SettingsButton
