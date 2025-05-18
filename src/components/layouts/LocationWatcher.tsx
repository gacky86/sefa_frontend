import { closeModal } from "store/modalSlice";
import { useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";

const LocationWatcher = () => {
  const location = useLocation();
  const prevPath = useRef(location.pathname);
  const dispatch = useDispatch();

  // トップページから他のpathに遷移した際に、モーダル表示をリセットするためのuseEffect
  useEffect(() => {
    if(prevPath.current === '/' && location.pathname !== '/') {
      dispatch(closeModal());
    }
    prevPath.current = location.pathname;
  }, [location.pathname]);

  return null;
}

export default LocationWatcher
