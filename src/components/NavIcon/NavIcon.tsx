import styles from './NavIcon.module.css'
import type { NavIconProps } from '@/types'

type Props = NavIconProps & {
  isAvatar?: boolean
}

function NavIcon({ src, description, isAvatar = false }: Props) {
  return (
    <div className={styles.navIcon}>
      <div className={isAvatar ? styles.avatarContainer : styles.iconContainer}>
        <img src={src as string} alt={description} />
      </div>
      <span className={styles.descriptionIconText}>{description}</span>
    </div>
  )
}

export default NavIcon
