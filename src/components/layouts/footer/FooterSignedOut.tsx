// react-router-dom
import { Link } from "react-router-dom";

// icons
import { FaGithub } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";

const FooterSignedOut = () => {
  return (
    <div className='text-[10px] text-gray-500'>
      <div className='flex justify-center gap-3'>
        <Link to="/terms-of-service">
          利用規約
        </Link>
        <Link to="/privacy-policy">
          プライバシーポリシー
        </Link>
      </div>
      <div className='text-center flex justify-center gap-1'>
        <FaRegCopyright className='mt-[6px]'/>
        <p className='mt-[3px]'>2025 SEFA</p>
        <Link to='https://github.com/gacky86' className='text-black text-base mt-[2px]' target='_blank'>
          <FaGithub />
        </Link>
      </div>
    </div>
  )
}

export default FooterSignedOut
