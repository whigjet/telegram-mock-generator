import styles from './SearchField.module.css'
import searchIcon from '@/assets/icons/search.svg'

function SearchField() {
  return (
    <div className={styles.searchField_container}>
      <div className={styles.containerField}>
        <div className={styles.inputWrapper}>
          <img src={searchIcon} alt="search" />
          <span>Поиск</span>
        </div>
      </div>
    </div>
  )
}

export default SearchField
