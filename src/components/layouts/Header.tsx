import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div>
      <Link to='/signin'>
        ログイン
      </Link>
      <Link to='/singup'>
        新規登録
      </Link>
    </div>
  )
}

export default Header
