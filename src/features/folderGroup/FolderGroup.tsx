import { useRef } from 'react'
import styles from './FolderGroup.module.css'
import { generateCountMessage } from '@/utils/generateCountMessage'
import LiquidGlassSVG from '@/components/LiquidGlassSVG/LiquidGlassSVG.tsx'

function FolderGroup() {
  const folderRefs = useRef<(HTMLDivElement | null)[]>([])
  const activeIndex = 1

  const folderNames = ['Все', 'Личные', 'Каналы', 'Группы']

  const folderCounts = [
    generateCountMessage(400, 900),
    generateCountMessage(300, 500),
    generateCountMessage(50, 100),
    generateCountMessage(20, 50),
  ]

  return (
    <>
      <LiquidGlassSVG id="folderGlassDistortion" />

      <div className={styles.folderGroupWrapper}>
        <div className={styles.liquidGlassEffect}></div>
        <div className={styles.liquidGlassTint}></div>
        <div className={styles.liquidGlassShine}></div>

        <div className={styles.folderGroup}>
          {folderNames.map((name, i) => {
            const isActive = i === activeIndex
            const count = folderCounts[i]

            return (
              <div
                key={i}
                className={`${styles.folder} ${isActive ? styles.folderActive : ''}`}
                ref={(el) => {
                  if (el) {
                    folderRefs.current[i] = el
                  }
                }}
              >
                <span className={`${styles.folderText} ${isActive ? styles.textActive : ''}`}>
                  {name}
                </span>

                {count > 0 && (
                  <span
                    className={`${styles.counterMessage} ${isActive ? styles.counterActive : ''}`}
                  >
                    {count}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default FolderGroup
