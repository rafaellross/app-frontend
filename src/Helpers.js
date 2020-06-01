export const sortObjArray = (arr, property, asc = true) => {
    //console.log('Start Sort...', 'Property:', property, 'Array:', arr, asc ? 'asc' : 'desc')
    let result = [];
    if (asc) {

        result = arr.sort(function (a, b) {
            return a[property] - b[property]
        });


    } else {
        arr.sort(function (a, b) {
            return b[property] - a[property]
        });

    }

    console.log('Start Sort...', 'Property:', property, 'Array:', result, asc ? 'asc' : 'desc')
    return result;

}

export const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  export const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  export const stableSort = (array, comparator) =>{
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

 export const capitaliseString = (string)  =>
  {
      return string.replace(/\b\w/g, l => l.toUpperCase());
  }


  export const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

export const  minutesToHour = (minutes) => {

    function D(J) {

      return (

        J < 10
        ? '0'
        : '') + J;

    };
    return D(minutes / 60 | 0) + ':' + D(minutes % 60);
  }
