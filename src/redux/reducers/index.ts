import { combineReducers } from 'redux'
import { translateReducer, ghariReducer, fontStyleReducer, fontSizeArabiReducer, fontSizeFarsiReducer, newDataReducer } from './reducers'

const allReducers = combineReducers({
  translate: translateReducer,
  ghari: ghariReducer,
  fontStyle: fontStyleReducer,
  fsArabi: fontSizeArabiReducer,
  fsFarsi: fontSizeFarsiReducer,
  data: newDataReducer
})

export default allReducers

export type AllReducers = ReturnType<typeof allReducers>