import { Link } from "react-router-dom";
import { clearUser } from 'store/authSlice';
import { closeModal } from 'store/modalSlice';
import { useDispatch } from 'react-redux';
import { closeAccountModal } from "store/accountModalSlice";

const AccountModal = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(closeAccountModal());
    dispatch(closeModal());
    dispatch(clearUser());
  }
  return (
    <div className="fixed bottom-[56px] right-0 w-[120px] bg-white border-1
                  border-dark-navy-blue rounded-sm p-3 text-center text-dark-navy-blue font-medium">
      <h3 onClick={() => handleLogout()}>ログアウト</h3>
      <div className="mt-3">
        <Link to="/setting">設定</Link>
      </div>
      <div className="mt-3">
        <Link to="/account">アカウント</Link>
      </div>

    </div>
  )
}

export default AccountModal
