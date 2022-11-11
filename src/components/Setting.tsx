import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleTranslate, handleGhari, handleFontStyle, handleFontSizeArabi, handleFontSizeFarsi } from '../redux/actions/actions'
import { AllReducers } from '../redux/reducers/index'

const Setting = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentTranslate = useSelector((state: AllReducers) => state.translate)
  localStorage.setItem('translate', currentTranslate)
  const currentGhari = useSelector((state: AllReducers) => state.ghari)
  localStorage.setItem('ghari', currentGhari)
  const currentFontStyle = useSelector((state: AllReducers) => state.fontStyle)
  localStorage.setItem('fontStyle', currentFontStyle)
  const currentFontSizeArabi = useSelector((state: AllReducers) => state.fsArabi)
  localStorage.setItem('fsArabi', currentFontSizeArabi)
  const currentFontSizeFarsi = useSelector((state: AllReducers) => state.fsFarsi)
  localStorage.setItem('fsFarsi', currentFontSizeFarsi)



  const handleChangeTranslate = (e: any) => {
    if (e.target.id === 't1') {
      dispatch(handleTranslate('ansarian'))
    }
    else if (e.target.id === 't2') {
      dispatch(handleTranslate('makarem'))
    }
  }
  const handleChangeGhari = (e: any) => {
    if (e.target.id === 'g1') {
      dispatch(handleGhari('Menshawi_32kbps'))
    }
    else if (e.target.id === 'g2') {
      dispatch(handleGhari('AbdulSamad_64kbps_QuranExplorer.Com'))
    }
  }
  const handleChangeFontStyle = (e: any) => {
    if (e.target.id === 'f1') {
      dispatch(handleFontStyle('f1'))
    }
    else if (e.target.id === 'f2') {
      dispatch(handleFontStyle('f2'))
    }
  }
  const handleChangeFontSizeArabi = (e: any) => {
    if (e.target.id === 'fsa1') {
      dispatch(handleFontSizeArabi('28'))
    }
    else if (e.target.id === 'fsa2') {
      dispatch(handleFontSizeArabi('22'))
    }
  }
  const handleChangeFontSizeFarsi = (e: any) => {
    if (e.target.id === 'fsf1') {
      dispatch(handleFontSizeFarsi('18'))
    }
    else if (e.target.id === 'fsf2') {
      dispatch(handleFontSizeFarsi('22'))
    }
  }
  const handleSubmit = () => {
    navigate(-1)
  }

  return (
    <div className='setting-wrapper'>

      <p className='setting-title'>تنظیمات</p>

      <div className="translate-section"><span className='title'>مترجم: </span>

        <div className="ansarian">
          <label htmlFor="t1">انصاریان</label>
          <input
            id='t1'
            type='radio'
            name='translate'
            onChange={handleChangeTranslate}
            defaultChecked={localStorage.getItem('translate') === 'ansarian'}
          />
        </div>
        <div className="makarem">
          <label htmlFor="t2">مکارم شیرازی</label>
          <input
            id='t2'
            type='radio'
            name='translate'
            onChange={handleChangeTranslate}
            defaultChecked={localStorage.getItem('translate') === 'makarem'}
          />
        </div>
      </div>

      <div className="ghari-section"><span className='title'>قاری: </span>
        <div className="menshavi">
          <label htmlFor="g1">منشاوی</label>
          <input
            id='g1'
            type='radio'
            name='ghari'
            defaultChecked={localStorage.getItem('ghari') === 'Menshawi_32kbps'}
            onChange={handleChangeGhari} />
        </div>
        <div className="abdul-baset">
          <label htmlFor="g2">عبدالباسط</label>
          <input
            id='g2'
            type='radio'
            name='ghari'
            defaultChecked={localStorage.getItem('ghari') === 'AbdulSamad_64kbps_QuranExplorer.Com'}
            onChange={handleChangeGhari} />
        </div>
      </div>

      <div className="font-family-setion"><span className='title'>فونت:  </span>
        <div className="font-1">
          <label htmlFor="f1">بدر</label>
          <input
            id='f1'
            type='radio'
            name='font'
            defaultChecked={localStorage.getItem('fontStyle') === 'f1'}
            onChange={handleChangeFontStyle} />
        </div>
        <div className="font-2">
          <label htmlFor="f2">اون یکی</label>
          <input
            id='f2'
            type='radio'
            name='font'
            defaultChecked={localStorage.getItem('fontStyle') === 'f2'}
            onChange={handleChangeFontStyle} />
        </div>
      </div>

      <div className="font-size-arabi-section"><span className='title'>اندازه فونت عربی:  </span>
        <div className="font-size-arabi-1">
          <label htmlFor="fsa1">28px</label>
          <input
            id='fsa1'
            type='radio'
            name='font-size-arabi'
            defaultChecked={localStorage.getItem("fsArabi") === '28'}
            onChange={handleChangeFontSizeArabi} />
        </div>
        <div className="font-size-arabi-2">
          <label htmlFor="fsa2">22px</label>
          <input
            id='fsa2'
            type='radio'
            name='font-size-arabi'
            defaultChecked={localStorage.getItem("fsArabi") === '22'}
            onChange={handleChangeFontSizeArabi} />
        </div>
      </div>

      <div className="font-size-farsi-section"><span className='title'>اندازه فونت فارسی:  </span>
        <div className="font-size-farsi-1">
          <label htmlFor="fsf1">18px</label>
          <input
            id='fsf1'
            type='radio'
            name='font-size-farsi'
            defaultChecked={localStorage.getItem('fsFarsi') === '18'}
            onChange={handleChangeFontSizeFarsi} />
        </div>
        <div className="font-size-farsi-2">
          <label htmlFor="fsf2">22px</label>
          <input
            id='fsf2'
            type='radio'
            name='font-size-farsi'
            defaultChecked={localStorage.getItem('fsFarsi') === '22'}
            onChange={handleChangeFontSizeFarsi} />
        </div>
      </div>

      <div className="apply">
        <button className='setting-btn' onClick={handleSubmit}>ثبت</button>
      </div>
    </div>
  )
}

export default Setting