
import { pages, suras } from '../resource/quran-metadata'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Obj1 } from '../types'
import { emla } from '../resource/quran-text-emla'
import { useDispatch, useSelector } from 'react-redux'
import { handleNewData } from '../redux/actions/actions'
import { ansarian } from '../resource/quran-translate.fa.ansarian'
import { makarem } from '../resource/quran-translate.fa.makarem'


const Suras = () => {

  const [data, setData] = useState<any>()
  const s: any = suras
  const [match, setMatch] = useState<any>(suras)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let idx = 0
  let page = 1

  useEffect(() => { newData() }, [])

  const handleChange = (e: any) => {
    let matchSearched: any[] = []
    for (let c = 0; c < s.length - 1; c++) {
      if (s[c][4].includes(e.target.value) || s[c][6].toLowerCase().includes(e.target.value)) {
        matchSearched.push(s[c])
      }
    }
    setMatch(matchSearched)
  }
  const findSura = (item: any[]) => {
    for (let c = 0; c < suras.length; c++) {
      if (item[4] === suras[c][4]) {
        idx = c
        break
      }
    }
    for (let c1 = 1; c1 < pages.length; c1++) {
      if (pages[c1][0] === idx + 1 && pages[c1][1] === 1) {
        page = c1
        break
      }
      else if (pages[c1][0] === idx + 1 && pages[c1][1] !== 1) {
        page = c1 - 1
        break
      }
      else {
        for (let c2 = 0; c2 < 6; c2++) {
          if (idx - c2 === pages[c1][0]) {
            page = c1
          }
        }
      }
    }
    navigate(`page/${page}`)
  }
  const newData = () => {
    const arrTemp: any[] = []
    for (let c = 0; c < suras.length - 1; c++) {
      let arr: Obj1 = {
        ayat: [],
        makarem: [],
        ansarian: [],
        ayatNumber: [],
        sure: '',
        sureNumber: 0,
        type: '',
      }
      for (let c1 = 0; c1 < (Number(suras[c][1]) - Number(suras[c][0]) + Number(suras[c][0])); c1++) {
        arr.ayat.push(emla[Number(suras[c][0]) + c1])
        arr.makarem.push(makarem[Number(suras[c][0]) + c1])
        arr.ansarian.push(ansarian[Number(suras[c][0]) + c1])
        arr.ayatNumber.push(c1 + 1)
        arr.sure = String(suras[c][4])
        arr.sureNumber = c + 1
        arr.type = String(suras[c][7])
      }
      arrTemp.push(arr)
    }
    // setData(arrTemp)
    dispatch(handleNewData(arrTemp))
  }
  return (
    <div className="all-suras">
      {/* search box */}
      <br />
      <div className='search-area'>
        <input
          className='search-box'
          type='text'
          placeholder='نام سوره...'
          autoFocus
          onChange={(e) => { handleChange(e) }} />
      </div><br />
      {/* suras */}
      <div >
        {match.length > 0
          &&
          match.map((item: any, index: number) => {
            {
              return (
                item[1] > 1 &&
                <div onClick={() => { findSura(item) }} className='sure' key={index}>
                  <h2> نام سوره:{item[4]}</h2>
                  <h2>{item[6]}</h2>
                  <h2>تعداد آیات:{item[1]}</h2>
                  <h2>{item[7]}</h2>
                </div>)
            }
          })
        }
      </div>
    </div>
  )
}

export default Suras
