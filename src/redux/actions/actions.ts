import { Actions } from '../../types'

export const ACTIONS: Actions = {
  CHANGETRANSLATE: 'changeTranslate',
  CHANGEGHARI: 'changeGhari',
  CHANGEFONTSTYLE: 'changeFontStyle',
  CHANGEFONTSIZEARABI: 'changeFontSizeArabi',
  CHANGEFONTSIZEFARSI: 'changeFontSizeFarsi',
  GETNEWDATA: 'newData',
}

export const handleTranslate = (name: string) => {
  return {
    type: ACTIONS.CHANGETRANSLATE,
    payload: name
  }
}

export const handleGhari = (name: string) => {
  return {
    type: ACTIONS.CHANGEGHARI,
    payload: name
  }
}

export const handleFontStyle = (name: string) => {
  return {
    type: ACTIONS.CHANGEFONTSTYLE,
    payload: name
  }
}

export const handleFontSizeArabi = (name: string) => {
  return {
    type: ACTIONS.CHANGEFONTSIZEARABI,
    payload: name
  }
}

export const handleFontSizeFarsi = (name: string) => {
  return {
    type: ACTIONS.CHANGEFONTSIZEFARSI,
    payload: name
  }
}

export const handleNewData = (data: any) => {
  return {
    type: ACTIONS.GETNEWDATA,
    payload: data
  }
}
