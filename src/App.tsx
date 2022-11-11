import { suras, pages } from './resource/quran-metadata'
import './App.css';
import { Obj1, Obj2, Aye } from './types';
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AllReducers } from './redux/reducers';
import ControlAudio from './components/ControlAudio';
import SettingLogo from './components/SettingLogo';

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

  useEffect(() => {
    pageContent(Number(pageNumber))
  }, [pageNumber])

  const pageContent = (page: number) => {

    const content: Obj2 = {
      ayat: [],
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

          if (c !== startSure + endOfLoop) {
            for (let c1 = startAye - 1; c1 < data[c - 1].ayat.length; c1++) {

              if (data[c - 1].ayat[c1] !== undefined) {
                // console.log(data[c - 1].ayat[c1], 'and ', data[c - 1].ayatNumber[c1]);
                content.ayat.push(data[c - 1].ayat[c1])
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
          else {
            for (let c2 = 0; c2 < pages[Number(page) + 1][1] - 1; c2++) {
              // console.log(data[c - 1].ayat[c2], 'and ', data[c - 1].ayatNumber[c2]);
              content.ayat.push(data[c - 1].ayat[c2])
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
  const handleSut = (item: Aye | string, index: number | string) => {

    if (typeof item !== 'string' && typeof index !== 'string') {
      let sure = String(item.sureNumber).padStart(3, '0')
      let aye = String(index).padStart(3, '0')
      setSure(sure)
      setAye(aye)
      setToggle(true)
    } else {
      if (typeof item === 'string' && typeof index === 'string') {
        setSure(item)
        setAye(index)
        setToggle(true)
      }
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
  console.log(content);

  return (
    <div className="page-content-wrapper">
      <audio onEnded={handleNext} className="audio" controls autoPlay={toggle} muted={!toggle} src={`http://www.everyayah.com/data/${currentGhari}/${sure}${aye}.mp3`}>
        play
      </audio>
      <SettingLogo />
      {toggle && <ControlAudio setToggle={setToggle} />}
      <div className="content">
        {content.map((item: any, index: number) => {
          return (
            <div key={index}>
              {item.ayat.map((i: string, idx: number) => {
                return (
                  <div key={idx}>
                    {content[0].ayatNumber[idx] === 1
                      ?
                      <div>
                        {content[0].sureNumber[cnt] !== 1 && content[0].sureNumber[cnt] !== 9
                          ?
                          <div>
                            <span className='hidden'>{cnt += 1}</span>
                            <br /><div>سوره <strong>{content[0].sureNumber[cnt]}</strong> قرآن <strong>{content[0].sure[cnt]}</strong> <strong>{suras[Number(content[0].sureNumber[cnt]) - 1][7]}</strong></div>
                            <br /><div>بِسۡمِ اللّٰهِ الرَّحۡمٰنِ الرَّحٖیمِ</div>
                            <br /><div onClick={() => { handleSut(content[0], content[0].ayatNumber[idx]) }}>
                              {i} {content[0].ayatNumber[idx]}
                            </div>
                          </div>
                          :
                          <div>
                            <br /><div>سوره <strong>{content[0].sureNumber[cnt]}</strong> قرآن <strong>{content[0].sure[cnt]}</strong> <strong>{suras[Number(content[0].sureNumber[cnt]) - 1][7]}</strong></div>
                            <br /><div onClick={() => { handleSut(content[0], content[0].ayatNumber[idx]) }}>
                              {i} {content[0].ayatNumber[idx]}
                            </div>
                          </div>
                        }
                      </div>
                      :
                      <div onClick={() => handleSut(content[0], content[0].ayatNumber[cnt])}>
                        {i} {content[0].ayatNumber[idx]}
                      </div>
                    }
                  </div>)
              })}
            </div>)
        })}
      </div>
      <div className="navigate">
        {Number(pageNumber) !== 604 && <button className="next" onClick={next}>صفحه بعدی</button>}
        <button className="back" onClick={backToMenu}>لیست سوره‌ها</button>
        {Number(pageNumber) !== 1 && <button className="pre" onClick={previous}>صفحه قبلی</button>}
      </div>
    </div >
  );
}

export default App;
