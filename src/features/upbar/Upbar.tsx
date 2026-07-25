import editIcon from '@/assets/icons/edit-icon.svg'
import addHistory from '@/assets/icons/add-history.png'
import styles from './Upbar.module.css'
import { useChats } from '@/context/ChatsContext'

import HistoryBlock from '@/components/historyBlock/HistoryBlock'
import { LiquidButton } from '@/components/LiquidButton/LiquidButton.tsx'

function Upbar() {
  const { editMode, toggleEditMode } = useChats()
  return (
    <div className={styles.upbar_container}>
      <div className={styles.upbar_wrapper}>
        <LiquidButton onClick={toggleEditMode} className={styles.edit_button}>
          <p className={styles.upbar__edit_text} onClick={toggleEditMode}>
            {editMode ? 'Ок' : 'Изм.'}
          </p>
        </LiquidButton>
        <div className={styles.upbar_center_line}>
          <div className={styles.upbar_historyBlock}>
            <div className={styles.historyItem}>
              <HistoryBlock />
            </div>
            <div className={styles.historyItem}>
              <HistoryBlock />
            </div>
            <div className={styles.historyItem}>
              <HistoryBlock />
            </div>
          </div>
          <p className={styles.upbar__title}>Чаты</p>
        </div>
        <LiquidButton className={styles.upbar_icons}>
          <img src={addHistory} alt="" className={styles.addHistory_icon} />
          <img src={editIcon} alt="edit" className={styles.edit_icon} />
        </LiquidButton>
      </div>
    </div>
  )
}

export default Upbar
