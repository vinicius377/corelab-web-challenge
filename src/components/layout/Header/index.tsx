import logoImage from 'assets/images/1b27213540f22b3bda3ab0125bf1fd2f.png'
import styles from './Header.module.scss'
import { TextField } from 'components/shared/TextField'
import { Search } from 'lucide-react'
import { useLayoutContext } from '../context/LayoutContext'

export function Header() {
  const { setSearchTerm } = useLayoutContext()

  return (
    <header className={styles.Header}>
      <div className={styles.contentLeft} >
        <div className={styles.logoBox} tabIndex={0} aria-label='Logo'>
          <img src={logoImage} alt="imagem da duas notas penduradas com um alfinete" />
          <h1>CoreNotes</h1>
        </div>
        <TextField
          style={{ flex: 1 }}
          icon={<Search color="#9E9E9E" />}
          placeholder="Pesquisar notas"
          classNameBox={styles.boxSearch}
          onChange={e => setSearchTerm(e.target.value)}
          role='search'
        />
      </div>
    </header>
  )
}
