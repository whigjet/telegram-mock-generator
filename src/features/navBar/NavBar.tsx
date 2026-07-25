import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './NavBar.module.css'

import contacts from '@/assets/icons/contacts.svg'
import phone from '@/assets/icons/phone.svg'
import chats from '@/assets/icons/chats.svg'
import searchIcon from '@/assets/icons/search.svg'

import { generateCountMessage } from '@/utils/generateCountMessage'
import LiquidGlassSVG from '@/components/LiquidGlassSVG/LiquidGlassSVG'

function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const countMessage = generateCountMessage(40, 80)
  const [avatar, setAvatar] = useState<string | undefined>(undefined)

  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar')
    if (savedAvatar) setAvatar(savedAvatar)
  }, [])

  useEffect(() => {
    const handleStorageChange = () => {
      const savedAvatar = localStorage.getItem('userAvatar')
      setAvatar(savedAvatar ?? undefined)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const getActiveTab = () => {
    const path = location.pathname
    if (path === '/contacts') return 'contacts'
    if (path === '/calls') return 'calls'
    if (path === '/chats' || path === '/') return 'chats'
    if (path === '/settings') return 'settings'
    return 'chats'
  }

  const activeTab = getActiveTab()

  const tabs = [
    { id: 'contacts', icon: contacts, label: 'Контакты', path: '/settings' },
    { id: 'calls', icon: phone, label: 'Звонки', path: '/settings' },
    { id: 'chats', icon: chats, label: 'Чаты', path: '/chats', count: countMessage },
    { id: 'settings', icon: avatar, label: 'Настройки', path: '/settings', isAvatar: true },
  ]

  return (
    <>
      <LiquidGlassSVG id="navGlassDistortion" />

      <div className={styles.navBarContainer}>
        <div className={styles.navBarWrapper}>
          <div className={styles.liquidGlassEffect}></div>
          <div className={styles.liquidGlassTint}></div>
          <div className={styles.liquidGlassShine}></div>

          <div className={styles.navBar}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <div
                  key={tab.id}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                  onClick={() => navigate(tab.path)}
                >
                  <div className={styles.navIconWrapper}>
                    <img
                      src={tab.icon}
                      alt={tab.label}
                      className={`
                        ${styles.navIcon} 
                        ${tab.isAvatar ? styles.navIconAvatar : ''} 
                        ${isActive && !tab.isAvatar ? styles.navIconActive : ''}
                      `}
                    />
                    {tab.count && (
                      <div className={styles.badge}>
                        <span>{tab.count}</span>
                      </div>
                    )}
                  </div>
                  <span className={`${styles.navLabel} ${isActive ? styles.navLabelActive : ''}`}>
                    {tab.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className={styles.searchButtonWrapper}>
          <div className={styles.liquidGlassEffect}></div>
          <div className={styles.liquidGlassTint}></div>
          <div className={styles.liquidGlassShine}></div>

          <button className={styles.searchButton}>
            <img src={searchIcon} alt="search" className={styles.searchIcon} />
          </button>
        </div>
      </div>
    </>
  )
}

export default NavBar
