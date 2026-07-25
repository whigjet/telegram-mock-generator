import styles from './HistoryBlock.module.css'
import { manAvatar } from '@/data/chatData'
import { womanAvatar } from '@/data/chatData'

function HistoryBlock() {
  const randomManIndex = Math.floor(Math.random() * manAvatar.length)
  const randomWomanIndex = Math.floor(Math.random() * womanAvatar.length)

  const randomAvatar = manAvatar[randomManIndex]
  const randomAvatarWoman = womanAvatar[randomWomanIndex]

  const randomAvatarChoice = Math.random() < 0.5 ? randomAvatar : randomAvatarWoman

  return (
    <div className={styles.historyBlock_borderCircle}>
      <div className={styles.historyBlock_whiteCircle}>
        <div className={styles.historyBlock_photoCircle}>
          <img src={randomAvatarChoice} alt="" />
        </div>
      </div>
    </div>
  )
}

export default HistoryBlock
