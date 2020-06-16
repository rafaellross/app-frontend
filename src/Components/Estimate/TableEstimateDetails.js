import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'
import NumberFormat from 'react-number-format';

function Drawing(props) {
    const { useState } = React;

    const [columns, setColumns] = useState([
      { title: 'Drawing', field: 'drawing', cellStyle:{padding: '5px'} },
      {
        field: 'total',
        title: 'Total',
        sorting: true,
        render: rowData => (
            <NumberFormat decimalScale={2} value={Math.random() * Math.random() * 100000} displayType={'text'} thousandSeparator={true} prefix={'$'} />

        )
    }

    ]);

    const getDrawings = (details) => {
        let folders = details.map((detail) => (detail.drawing)).filter((value, index, self) => self.indexOf(value) === index).sort();
        return [...new Set(folders.map((folder) => ({drawing: folder})))]
    }

    return (
        <div style={{marginBottom: 30}}>
        <MaterialTable
            title={props.project.name}
            columns={columns}
            data={getDrawings(props.data)}
            options={{
                actionsColumnIndex: -1,
                exportButton: false,
                paging: false,
                maxBodyHeight: '100vh',
                padding: 'default',

                rowStyle: rowData => ({
                    backgroundColor: (rowData.tableData.id % 2 === 0) ? '#EEE' : '#FFF'
                })

            }}

            editable={{
            onRowAdd: newData =>
                new Promise((resolve, reject) => {
                setTimeout(() => {
                    props.handleChange(newData);

                    resolve();
                }, 1000)
                }),
            onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                setTimeout(() => {
                    const dataUpdate = [...props.data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    props.handleUpdate([...dataUpdate]);

                    resolve();
                }, 1000)
                }),
            onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                setTimeout(() => {
                    const dataDelete = [...props.data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    props.handleDelete([...dataDelete]);
                    resolve()
                }, 1000)
                }),
            }}
            detailPanel={rowData => {
                return (
                    <Service
                        data={props.data.filter((detail) => detail.drawing === rowData.drawing)}
                        drawing={rowData.drawing}
                    />
                )
            }}
            />
        </div>
    )
}

function EstimateItem(props) {
    const { useState } = React;

    const [columns, setColumns] = useState([
      { title: 'Code', field: 'code'},
      { title: 'Dimension', field: 'dimension' },
      {
        field: 'quantity',
        title: 'Qty',
        sorting: true,
        render: rowData => (
            rowData.dimtype === "L" ? rowData.length : rowData.count
        )
    },
    {
        field: 'total',
        title: 'Total',
        sorting: true,
        render: rowData => (
            <NumberFormat decimalScale={2} value={Math.random() * Math.random() * 100000} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        )
    }

    ]);

    return (
        <div style={{width: '95%', marginLeft: '5%', marginBottom: 30}}>
        <MaterialTable
            title={"Items"}
            columns={columns}
            options={{
                actionsColumnIndex: -1,
                exportButton: false,
                paging: false,
                maxBodyHeight: '100vh',
                padding: 'dense',
                showTitle: false,
                rowStyle: rowData => ({
                    backgroundColor: (rowData.tableData.id % 2 === 0) ? '#AFEEEE' : '#FFF'
                  })

            }}

            data={props.data}
            editable={{
            onRowAdd: newData =>
                new Promise((resolve, reject) => {
                setTimeout(() => {
                    props.handleChange(newData);

                    resolve();
                }, 1000)
                }),
            onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                setTimeout(() => {
                    const dataUpdate = [...props.data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    props.handleUpdate([...dataUpdate]);

                    resolve();
                }, 1000)
                }),
            onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                setTimeout(() => {
                    const dataDelete = [...props.data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    props.handleDelete([...dataDelete]);
                    resolve()
                }, 1000)
                }),
            }}
        />
      </div>
    )
}

function Service(props) {
    const { useState } = React;

    const [columns, setColumns] = useState([
      { title: 'Service', field: 'service' },
      {
        field: 'total',
        title: 'Total',
        sorting: true,
        render: rowData => (
            <NumberFormat decimalScale={2} value={Math.random() * Math.random() * 100000} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        )
    }

    ]);

    const getService = (details) => {
        let folders = details.map((detail) => (detail.service)).filter((value, index, self) => self.indexOf(value) === index).sort();
        return [...new Set(folders.map((folder) => ({service: folder})))]
    }

    return (
      <div style={{width: '95%', marginLeft: '5%', marginBottom: 30}}>
      <MaterialTable
        title={"Services"}
        columns={columns}
        options={{
            actionsColumnIndex: -1,
            exportButton: false,
            paging: false,
            maxBodyHeight: '100vh',
            padding: 'dense',
            showTitle: false,
            rowStyle: rowData => ({
                backgroundColor: (rowData.tableData.id % 2 === 0) ? '#F5FFFA' : '#FFF'
              })

          }}

        data={getService(props.data)}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                props.handleChange(newData);

                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...props.data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                props.handleUpdate([...dataUpdate]);

                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...props.data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                props.handleDelete([...dataDelete]);
                resolve()
              }, 1000)
            }),
        }}
        detailPanel={rowData => {
            return (
                <EstimateItem
                    data={props.data.filter((detail) => detail.drawing === props.drawing && detail.service === rowData.service )}
                />
            )
          }}
      />
      </div>
    )
}




export default function TableEstimateDetails(props) {

    return (
        <Drawing
            project={props.project}
            data={props.data}
        />
    )
}
