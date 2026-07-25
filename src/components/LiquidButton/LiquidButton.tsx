import styles from './LiquidButton.module.css'
import type { ReactNode } from 'react'

interface LiquidButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export const LiquidButton = ({ children, onClick, className }: LiquidButtonProps) => {
  const combinedCLass = `${styles.liquidButton} ${className || ''}`.trim()

  return (
    <button className={combinedCLass} onClick={onClick} type={'button'}>
      {children}
    </button>
  )
}
