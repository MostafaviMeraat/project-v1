import { ACTIONS } from '../actions/actions'
import { Action } from '../../types'
import { stat } from 'fs'


const initialTranslate: string = 'ansarian'
const initialGhari: string = 'Menshawi_32kbps'
const initialFontStyle: string = 'f1'
const initialFontSizeArabi: string = '28'
const initialFontSizeFarsi: string = '22'
const initialData: any = []

export const translateReducer = (state = initialTranslate, action: Action) => {
  switch (action.type) {
    case ACTIONS.CHANGETRANSLATE:
      return state = action.payload
    default:
      return state
  }
}

export const ghariReducer = (state = initialGhari, action: Action) => {
  switch (action.type) {
    case ACTIONS.CHANGEGHARI:
      return state = action.payload
    default:
      return state
  }
}

export const fontStyleReducer = (state = initialFontStyle, action: Action) => {
  switch (action.type) {
    case ACTIONS.CHANGEFONTSTYLE:
      return state = action.payload
    default:
      return state
  }
}

export const fontSizeArabiReducer = (state = initialFontSizeArabi, action: Action) => {
  switch (action.type) {
    case ACTIONS.CHANGEFONTSIZEARABI:
      return state = action.payload
    default:
      return state
  }
}

export const fontSizeFarsiReducer = (state = initialFontSizeFarsi, action: Action) => {
  switch (action.type) {
    case ACTIONS.CHANGEFONTSIZEFARSI:
      return state = action.payload
    default:
      return state
  }
}

export const newDataReducer = (state = initialData, action: Action) => {
  switch (action.type) {
    case ACTIONS.GETNEWDATA:
      return state = action.payload
    default:
      return state
  }
}