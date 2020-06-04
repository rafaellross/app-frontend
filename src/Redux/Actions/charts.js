
import * as API from '../../Api';


export const RECEIVE_CHART = 'RECEIVE_CHART'

function receiveTimesheetsChart (charts) {
  return {
    type: RECEIVE_CHART,
    charts,
  }
}


export function handleTimeSheetChart () {

    return (dispatch) => {
     if(localStorage.token)
      return Promise.all([
        API.fetchTimesheetsChart()

      ]).then(([ charts ]) => {
        dispatch(receiveTimesheetsChart(charts))
      })
    }
  }

