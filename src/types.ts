export type Obj1 = {
  ayat: string[]
  ayatNumber: number[]
  sure: string
  sureNumber: number
  type: string
}

export type Obj2 = {
  ayat: string[]
  ayatNumber: number[]
  sure: string[]
  sureNumber: number[]
  type: string[]
}

export type Actions = {
  CHANGETRANSLATE: string
  CHANGEGHARI: string
  CHANGEFONTSTYLE: string
  CHANGEFONTSIZEARABI: string
  CHANGEFONTSIZEFARSI: string
  GETNEWDATA: string
}

export type Action = {
  type: string
  payload: any
}

export type Aye = {
  aye: string[]
  translateAnsarian: string[]
  translateMakarem: string[]
  ayeNumber: number[]
  sure: string
  type: string
  sureNumber: number
}