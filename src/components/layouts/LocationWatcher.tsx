import { closeModal } from "store/modalSlice";
import { clearFCLearning } from "store/fcLearningSlice";
import { closeAccountModal } from "store/accountModalSlice";
import { useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";

const LocationWatcher = () => {
  const location = useLocation();
  const prevPath = useRef(location.pathname);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentPath = location.pathname;
    const previousPath = prevPath.current;

    // ページ遷移が生じたら必ず実行
    if (previousPath !== currentPath) {
      dispatch(closeAccountModal());
    }

    // '/' から別ページに遷移したとき
    if (previousPath === '/' && currentPath !== '/') {
      dispatch(closeModal());
      dispatch(closeAccountModal());
    }

    // '/fc-learning' から別ページに遷移したとき
    if (previousPath === '/fc-learning' && currentPath !== '/fc-learning') {
      dispatch(clearFCLearning());
    }

    // 最後に前のパスを更新
    prevPath.current = currentPath;
  }, [location.pathname]);

  return null;
}

export default LocationWatcher
