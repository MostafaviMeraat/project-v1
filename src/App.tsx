import { suras, pages } from './resource/quran-metadata'
import { emla } from './resource/quran-text-emla'
import './App.css';
import { useState, useEffect } from 'react'
import { obj1 } from './types'
import SureHeadBesmellah from './components/SureHeadBesmellah';
import SureHead from './components/SureHead';

function App() {

  const [data, setdata] = useState<any>([])
  const [content, setContent] = useState<any>([])

  useEffect(() => {
    newData()

    return () => {

    }
  }, [])

  const handleChange = (e: any) => {
    try {
      pageContent(e.target.value)
    } catch (error) {

    }

  }
  const newData = () => {
    const arrTemp: any[] = []
    for (let c = 0; c < suras.length - 1; c++) {
      let arr: obj1 = {
        ayat: [],
        ayatNumber: [],
        sure: '',
        sureNumber: 0,
        type: '',
      }
      for (let c1 = 0; c1 < (Number(suras[c][1]) - Number(suras[c][0]) + Number(suras[c][0])); c1++) {
        arr.ayat.push(emla[Number(suras[c][0]) + c1])
        arr.ayatNumber.push(c1 + 1)
        arr.sure = String(suras[c][4])
        arr.sureNumber = c + 1
        arr.type = String(suras[c][7])
      }
      arrTemp.push(arr)
    }
    setdata(arrTemp)
  }
  const pageContent = (page: number) => {

    const content: obj1 = {
      ayat: [],
      ayatNumber: [],
      sure: '',
      sureNumber: 1,
      type: '',
    }
    let arr = []
    const startSure = pages[page][0]
    let startAye = pages[page][1]
    const endSure = pages[Number(page) + 1][0]
    const endAye = pages[Number(page) + 1][1]
    const endOfLoop = (endSure - startSure) + startSure - startSure
    // console.log(startSure, startAye, endSure, endAye, endOfLoop);


    if (endOfLoop > 0) {
      for (let c = startSure; c <= startSure + endOfLoop; c++) {

        if (c !== startSure + endOfLoop) {
          for (let c1 = startAye - 1; c1 < data[c - 1].ayat.length; c1++) {//here

            if (data[c - 1].ayat[c1] !== undefined) {
              // console.log(data[c - 1].ayat[c1], 'and ', data[c - 1].ayatNumber[c1]);
              content.ayat.push(data[c - 1].ayat[c1])
              content.ayatNumber.push(data[c - 1].ayatNumber[c1])
              content.sure = data[c - 1].sure
              content.sureNumber = data[c - 1].sureNumber
              content.type = data[c - 1].type
            }
          }
          // console.log('sureNumber is: ', data[c - 1].sureNumber, 'type is: ', data[c - 1].type);
          startAye = 0
        }
        else {
          for (let c2 = 0; c2 < pages[Number(page) + 1][1] - 1; c2++) {//here
            // console.log(data[c - 1].ayat[c2], 'and ', data[c - 1].ayatNumber[c2]);
            content.ayat.push(data[c - 1].ayat[c2])
            content.ayatNumber.push(data[c - 1].ayatNumber[c2])
            content.sure = data[c - 1].sure
            content.sureNumber = data[c - 1].sureNumber
            content.type = data[c - 1].type
          }

          // console.log('sureNumber is: ', data[c - 1].sureNumber, 'type is: ', data[c - 1].type);
        }
        // break
      }
      arr.push(content)
    }
    else {
      for (let c = startSure; c <= startSure; c++) {
        for (let c1 = startAye - 1; c1 < endAye - 1; c1++) {//here
          if (data[c - 1].ayat[c1] !== undefined) {
            // console.log(data[c - 1].ayat[c1], 'and ', data[c - 1].ayatNumber[c1]);
            content.ayat.push(data[c - 1].ayat[c1])
            content.ayatNumber.push(data[c - 1].ayatNumber[c1])
            content.sure = data[c - 1].sure
            content.sureNumber = data[c - 1].sureNumber
            content.type = data[c - 1].type
          }
        }
        arr.push(content)
        // console.log('sureNumber is: ', data[c - 1].sureNumber, 'type is: ', data[c - 1].type);
      }
    }
    setContent(arr)
  }
  return (
    <div className="App">
      <br /><input type='number' onChange={handleChange} /><hr />
      <div className="content">
        {content.map((item: any, index: number) => {
          return (<div key={index}>
            {item.ayat.map((i: string, idx: number) => {
              return (<div key={idx}>
                {content[0].ayatNumber[idx] === 1
                  ?
                  <div>
                    {content[0].sureNumber !== 1 && content[0].sureNumber !== 9
                      ?
                      <div>
                        <br /><div>سوره <strong>{content[0].sureNumber}</strong> قرآن <strong>{content[0].sure}</strong> <strong>{content[0].type}</strong></div>
                        <br /><div>بِسۡمِ اللّٰهِ الرَّحۡمٰنِ الرَّحٖیمِ</div>
                        <br />{i} {content[0].ayatNumber[idx]}
                      </div>
                      :
                      <div>
                        <br /><div>سوره <strong>{content[0].sureNumber}</strong> قرآن <strong>{content[0].sure}</strong> <strong>{content[0].type}</strong></div>
                        <br />{i} {content[0].ayatNumber[idx]}
                      </div>
                    }
                  </div>
                  :
                  <div>
                    {i} {content[0].ayatNumber[idx]}
                  </div>
                }
              </div>)
            })}
          </div>)
        })}
      </div>
    </div>
  );
}

export default App;
