import { suras, pages } from './resource/quran-metadata'
import './App.css';
import { Obj2 } from './types';
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AllReducers } from './redux/reducers';
import ControlAudio from './components/ControlAudio';
import SettingLogo from './components/SettingLogo';
import { classicNameResolver } from 'typescript';


function App() {


  const data = useSelector((state: AllReducers) => state.data)
  const [content, setContent] = useState<any>([])
  const { pageNumber } = useParams()
  const navigate = useNavigate()
  let cnt = -1
  const [toggle, setToggle] = useState<boolean>(false)
  const [sure, setSure] = useState<string>('')
  const [aye, setAye] = useState<string>('')
  const currentTranslate = localStorage.getItem('translate')
  const currentGhari = localStorage.getItem('ghari')
  const currentFontStyle = localStorage.getItem('fontStyle')
  const currentFontSizeArabi = localStorage.getItem('fsArabi')
  const currentFontSizeFarsi = localStorage.getItem('fsFarsi')
  console.log(currentFontStyle, currentFontSizeArabi, currentFontSizeFarsi);


  useEffect(() => {
    pageContent(Number(pageNumber))
  }, [pageNumber])

  const pageContent = (page: number) => {

    const content: Obj2 = {
      ayat: [],
      makarem: [],
      ansarian: [],
      ayatNumber: [],
      sure: [],
      sureNumber: [],
      type: [],
    }
    let arr = []
    const startSure = pages[page][0]
    let startAye = pages[page][1]
    const endSure = pages[Number(page) + 1][0]
    const endAye = pages[Number(page) + 1][1]
    const endOfLoop = (endSure - startSure) + startSure - startSure
    // console.log(startSure, startAye, endSure, endAye, endOfLoop);

    try {
      if (endOfLoop > 0) {//when sure change
        for (let c = startSure; c <= startSure + endOfLoop; c++) {

          if (c !== startSure + endOfLoop) {// !last round of loop
            for (let c1 = startAye - 1; c1 < data[c - 1].ayat.length; c1++) {

              if (data[c - 1].ayat[c1] !== undefined) {
                // console.log(data[c - 1].ayat[c1], 'and ', data[c - 1].ayatNumber[c1]);
                content.ayat.push(data[c - 1].ayat[c1])
                content.makarem.push(data[c - 1].makarem[c1])
                content.ansarian.push(data[c - 1].ansarian[c1])
                content.ayatNumber.push(data[c - 1].ayatNumber[c1])
                if (content.sure.length >= 0 && content.sure.indexOf(data[c - 1].sure) === -1) {
                  content.sure.push(data[c - 1].sure)
                }
                if (content.sureNumber.length >= 0 && content.sureNumber.indexOf(data[c - 1].sureNumber) === -1) {
                  content.sureNumber.push(data[c - 1].sureNumber)
                }
                if (content.type.length >= 0 && content.type.indexOf(data[c - 1].type) === -1) {
                  content.type.push(data[c - 1].type)
                }
              }
            }
            // console.log('sureNumber is: ', data[c - 1].sureNumber, 'type is: ', data[c - 1].type);
            startAye = 0
          }
          else { // last round of loop diffrence is in end of loop condition
            for (let c2 = 0; c2 < pages[Number(page) + 1][1] - 1; c2++) {
              // console.log(data[c - 1].ayat[c2], 'and ', data[c - 1].ayatNumber[c2]);
              content.ayat.push(data[c - 1].ayat[c2])
              content.makarem.push(data[c - 1].makarem[c2])
              content.ansarian.push(data[c - 1].ansarian[c2])
              content.ayatNumber.push(data[c - 1].ayatNumber[c2])
              if (content.sure.length >= 0 && content.sure.indexOf(data[c - 1].sure) === -1) {
                content.sure.push(data[c - 1].sure)
              }
              if (content.sureNumber.length >= 0 && content.sureNumber.indexOf(data[c - 1].sureNumber) === -1) {
                content.sureNumber.push(data[c - 1].sureNumber)
              }
              if (content.type.length >= 0 && content.type.indexOf(data[c - 1].type) === -1) {
                content.type.push(data[c - 1].type)
              }
            }

            // console.log('sureNumber is: ', data[c - 1].sureNumber, 'type is: ', data[c - 1].type);
          }
          // break
        }
        arr.push(content)
      }
      else { // sure not changed
        for (let c = startSure; c <= startSure; c++) {
          for (let c1 = startAye - 1; c1 < endAye - 1; c1++) {
            if (data[c - 1].ayat[c1] !== undefined) {
              // console.log(data[c - 1].ayat[c1], 'and ', data[c - 1].ayatNumber[c1]);
              content.ayat.push(data[c - 1].ayat[c1])
              content.makarem.push(data[c - 1].makarem[c1])
              content.ansarian.push(data[c - 1].ansarian[c1])
              content.ayatNumber.push(data[c - 1].ayatNumber[c1])
              if (content.sure.length >= 0 && content.sure.indexOf(data[c - 1].sure) === -1) {
                content.sure.push(data[c - 1].sure)
              }
              if (content.sureNumber.length >= 0 && content.sureNumber.indexOf(data[c - 1].sureNumber) === -1) {
                content.sureNumber.push(data[c - 1].sureNumber)
              }
              if (content.type.length >= 0 && content.type.indexOf(data[c - 1].type) === -1) {
                content.type.push(data[c - 1].type)
              }
            }
          }
          arr.push(content)
          // console.log('sureNumber is: ', data[c - 1].sureNumber, 'type is: ', data[c - 1].type);
        }
      }
      setContent(arr)
    } catch (error) {
      console.log(error);
    }

  }
  const next = () => {
    navigate(`/page/${Number(pageNumber) + 1}`)
  }
  const previous = () => {
    navigate(`/page/${Number(pageNumber) - 1}`)
  }
  const backToMenu = () => {
    navigate('/')
  }
  const handleSut = (sure0: number | string, aye0: number | string) => {

    if (typeof sure0 !== 'string' && typeof aye0 !== 'string') {
      setSure(String(sure0).padStart(3, '0'))
      setAye(String(aye0).padStart(3, '0'))
      setToggle(true)
    } else {
      setSure(String(sure0))
      setAye(String(aye0))
      setToggle(true)
    }
  }
  const handleNext = () => {

    let sureTemp: any = Number(sure)
    let ayeTemp: any = Number(aye)

    if (suras[sureTemp - 1][1] > ayeTemp) {
      ayeTemp += 1
    }
    else {
      sureTemp += 1
      ayeTemp = 1
    }

    sureTemp = String(sureTemp).padStart(3, '0')
    ayeTemp = String(ayeTemp).padStart(3, '0')

    let sureTemp0 = content[0].sureNumber
    let ayeTemp0 = content[0].ayatNumber[content[0].ayatNumber.length - 1]

    if (toggle && Number(sureTemp) <= sureTemp0 && Number(ayeTemp) <= ayeTemp0) {
      handleSut(sureTemp, ayeTemp)
    }
    else {
      setToggle(false)
    }
  }
  return (
    <div className={currentFontStyle === 'f1' ? 'page-content-wrapper aye-font1 translate-font1' : 'page-content-wrapper aye-font2 translate-font2'}>
      <audio onEnded={handleNext} className="audio" controls autoPlay={toggle} muted={!toggle} src={`http://www.everyayah.com/data/${currentGhari}/${sure}${aye}.mp3`}>
        play
      </audio>
      <SettingLogo />
      {toggle && <ControlAudio setToggle={setToggle} />}
      <div className="content">
        {content.map((item: any, index: number) => {
          return (
            <div key={index} >
              {item.ayat.map((i: string, idx: number) => {
                return (
                  <div key={idx} className='wrapper'>
                    {content[0].ayatNumber[idx] === 1
                      ? //age shuru sure bud 
                      <div>
                        <span className='hidden'>{cnt += 1}</span>
                        {content[0].sureNumber[cnt] !== 1 && content[0].sureNumber[cnt] !== 9
                          ? // tobe va hamd nabud 
                          <div>
                            <h2 className='sure-head'>???????? {content[0].sureNumber[cnt]} ???????? {content[0].sure[cnt]} {suras[Number(content[0].sureNumber[cnt]) - 1][7]}</h2>
                            <h2 className='sure-head'>???????????? ?????????????? ?????????????????????? ????????????????????</h2>
                            <div
                              onClick={() => { handleSut(content[0].sureNumber[cnt], content[0].ayatNumber[idx]) }}>
                              <span className={currentFontSizeArabi === '28' ? 'aye aye-fs-28' : 'aye aye-fs-22'}>{i}</span> <span className='aye-number'>???{content[0].ayatNumber[idx]}???</span>
                              {currentTranslate === 'makarem' ?
                                <div className={currentFontSizeFarsi === '22' ? 'translate-fs-22' : 'translate-fs-18'}>{content[0].makarem[idx]}</div>
                                :
                                <div className={currentFontSizeFarsi === '22' ? 'translate-fs-22' : 'translate-fs-18'}>{content[0].ansarian[idx]}</div>}
                            </div>
                          </div>
                          ://tobe va hamd 
                          <div>
                            <h2 className='sure-head'>???????? {content[0].sureNumber[cnt]} ???????? {content[0].sure[cnt]} {suras[Number(content[0].sureNumber[cnt]) - 1][7]}</h2>
                            <div
                              onClick={() => { handleSut(content[0].sureNumber[cnt], content[0].ayatNumber[idx]) }}>
                              <span className={currentFontSizeArabi === '28' ? 'aye aye-fs-28' : 'aye aye-fs-22'}>{i}</span> <span className='aye-number'>???{content[0].ayatNumber[idx]}???</span>
                              {currentTranslate === 'makarem' ?
                                <div className={currentFontSizeFarsi === '22' ? 'translate-fs-22' : 'translate-fs-18'}>{content[0].makarem[idx]}</div>
                                :
                                <div className={currentFontSizeFarsi === '22' ? 'translate-fs-22' : 'translate-fs-18'}>{content[0].ansarian[idx]}</div>}
                            </div>
                          </div>
                        }
                      </div>
                      : //edame sure(!shuru sure)
                      <div
                        onClick={() => handleSut(content[0].sureNumber[cnt], content[0].ayatNumber[idx])}>
                        {cnt < 0 && <span className='hidden'>{cnt += 1}</span>}
                        <span className={currentFontSizeArabi === '28' ? 'aye aye-fs-28' : 'aye aye-fs-22'}>{i}</span> <span className='aye-number'>???{content[0].ayatNumber[idx]}???</span>
                        {currentTranslate === 'makarem' ?
                          <div className={currentFontSizeFarsi === '22' ? 'translate-fs-22' : 'translate-fs-18'}>{content[0].makarem[idx]}</div>
                          :
                          <div className={currentFontSizeFarsi === '22' ? 'translate-fs-22' : 'translate-fs-18'}>{content[0].ansarian[idx]}</div>}
                      </div>
                    }
                  </div>)
              })}
            </div>)
        })}
      </div>
      <div className="navigate">
        {Number(pageNumber) !== 604 && <button className="next" onClick={next}>???????? ????????</button>}
        <button className="back" onClick={backToMenu}>???????? ???????????????</button>
        {Number(pageNumber) !== 1 && <button className="pre" onClick={previous}>???????? ????????</button>}
      </div>
    </div >
  );
}

export default App;
// font style and font sizes left to do