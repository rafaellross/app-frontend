import * as API from '../../Api'

export const RECEIVE_CHART = 'RECEIVE_CHART'

function receiveCharts (charts) {
  return {
    type: RECEIVE_CHART,
    charts,
  }
}

export function handleReceiveCharts () {

    return (dispatch) => {
     if(localStorage.token)
      return Promise.all([
        API.fetchTimesheetsChart()

      ]).then(([ charts ]) => {
        dispatch(receiveCharts(charts))
      })
    }
  }

