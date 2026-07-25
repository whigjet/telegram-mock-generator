import styles from './MainPage.module.css'
import Upbar from '@/features/upbar/Upbar'
import NavBar from '@/features/navBar/NavBar'
import FolderGroup from '@/features/folderGroup/FolderGroup'
import ChatList from '@/features/chatList/ChatList'
import SearchField from '@/components/SearchField/SearchField'
import { useEffect, useRef } from 'react'

function MainPage() {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = contentRef.current
    const root = rootRef.current
    if (!el || !root) return
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const max = 5
        const y = Math.min(el.scrollTop, max)
        const progress = y / max
        root.style.setProperty('--searchHide', String(progress))
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      el.removeEventListener('scroll', onScroll as any)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    const header = headerRef.current
    const root = rootRef.current
    if (!header || !root) return

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const h = entry.contentRect.height
        root.style.setProperty('--headerHeight', `${h}px`)
      }
    })
    ro.observe(header)
    return () => ro.disconnect()
  }, [])

  return (
    <div className={styles.mainPage} ref={rootRef}>
      <div className={styles.mainPage_header} ref={headerRef}>
        <Upbar />
        <SearchField />
        <FolderGroup />
      </div>
      <div className={styles.content} ref={contentRef}>
        <ChatList />
      </div>
      <NavBar />
    </div>
  )
}

export default MainPage
