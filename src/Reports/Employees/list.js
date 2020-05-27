import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';

import {Table, TableCell, TableHeader, TableBody, DataTableCell} from '@david.kucsai/react-pdf-table'


const debug = false

// Create styles
const styles = StyleSheet.create({
    page: {

        width: 600,
        padding: '1cm'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    table: {
        tableView: {marginTop: '70px'},
        tableHead: {fontSize: 5}
    }

});



const employees = []

let dateTime = new Date();


const tableSize = {
    name: 0.5,
    dob: 0.3,
    phone: 0.3,
    job: 0.3,
    apprentice_year: 0.3,
    anniversary_dt: 0.3
}

// Create Document Component
const MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.page} debug={debug}>
            <View>
                <Text style={{ textAlign: 'right', fontStyle: 'italic', fontSize: 10 }} fixed>Printed: {dateTime.toLocaleDateString()}</Text>
                <Image style={{ position: 'absolute', right: 0, top: 5, width: '100px' }} src="/img/logo.jpg" />
                <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: 'center', fontStyle: 'italic', fontSize: 15 }}>LIST OF EMPLOYEES</Text>

                </View>

                <View style={styles.table.tableView}>
                <Table
                    data={employees}
                >
                    <TableHeader style={styles.table.tableHead}>
                        <TableCell weighting={tableSize.name} textAlign="center" style={{fontSize: '10pt'}}>Name</TableCell>
                        <TableCell weighting={tableSize.dob} textAlign="center">D.O.B</TableCell>
                        <TableCell weighting={tableSize.phone} textAlign="center">Phone</TableCell>
                        <TableCell weighting={tableSize.role} textAlign="center">Role</TableCell>
                        <TableCell weighting={tableSize.job} textAlign="center">Job</TableCell>
                        <TableCell weighting={tableSize.apprentice_year} textAlign="center">Apprentice Year</TableCell>
                        <TableCell weighting={tableSize.anniversary_dt} textAlign="center">Apprentice Rollover</TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell getContent={(r) => r.name} weighting={tableSize.name}/>
                        <DataTableCell getContent={(r) => r.dob} weighting={tableSize.dob}/>
                        <DataTableCell getContent={(r) => r.phone} weighting={tableSize.phone}/>
                        <DataTableCell getContent={(r) => r.role} weighting={tableSize.role}/>
                        <DataTableCell getContent={(r) => r.job} weighting={tableSize.job}/>
                        <DataTableCell getContent={(r) => r.apprentice_year} weighting={tableSize.apprentice_year}/>
                        <DataTableCell getContent={(r) => r.anniversary_dt} weighting={tableSize.anniversary_dt}/>
                    </TableBody>
                </Table>

                </View>
            </View>
        </Page>
    </Document>
);


const ListEmployees = () => (
    <PDFViewer width={'100%'} height={900}>
        <MyDocument />
    </PDFViewer>
);


/*
const ListEmployeesDownload = () => (
    <div>
        <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
    </div>
)
*/
export default ListEmployees;
