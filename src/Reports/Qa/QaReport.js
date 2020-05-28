import React, { Component } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import * as API from '../../Api';
import {Table, TableCell, TableHeader, TableBody, DataTableCell} from '@david.kucsai/react-pdf-table'


const debug = false

// Create styles
const styles = StyleSheet.create({
    page: {
        width: 600,
        padding: '1cm'
    },

});



//Creates style for report's header

const stylesHeader = StyleSheet.create({

    title: {
        textAlign: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#ff9900',
        fontSize: '12pt',
        fontWeight: 'bold',
        height: 30,
        padding: '8px 0'
    },
    row: {
        flexDirection: 'row'
    },
    rowsTitle: {
        textAlign: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        width: 100,
        fontSize: '14pt',
        fontWeight: "bold",
        paddingTop: 5,
        height: 30,
    },
    rowsDetail: {
        textAlign: 'left',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        width: 535,
        fontSize: '12pt',
        paddingLeft: 5,
        height: 20,
        paddingTop: 3

    },
    logo: {
        textAlign: 'left',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        width: 150,
        paddingLeft: 5,
        borderBottom: 0,
        borderTop: 0

    }
  });


//Creates style for report's table

const stylesTable = StyleSheet.create({
    header: {
        textAlign: 'center',
        backgroundColor: '#ff9900',
        height: 25,
        fontSize: '10pt',
    },
    cell: {
        textAlign: 'center',
        fontSize: 9,
        paddingTop: 2,
        paddingBottom: 2

    },

    photo: {
        height: '47.85px'
    }
})

export class QaReport extends Component {

    constructor(props) {
        super(props)

        this.state = {

          data: [],
          isLoading: true

        }
    }

    componentDidMount() {
        console.log("Here", this.state.data)
        API.getAll('q_a_users/print', this.props.match.params.id)
        .then((qas) => {
            this.setState(() => ({
                data: qas,
                isLoading: false,
            }))

        })

    }




    render() {

        if (!this.state.isLoading) {
        const data = this.state.data;
        const widthSmallCols = 0.09;
        const widthLargeCols = 0.33;

        return (
            <PDFViewer width={'100%'} height={900}>
            {data.qas.map(qa => (
                <Document key={qa.id}>
                    <Page size="A4" style={styles.page} debug={debug} orientation="landscape">
                        <View fixed>
                            <Image style={{ position: 'absolute', right: '25%', top: '10%', width: '50%', opacity: 0.3 }} src="/img/logo.jpg"/>
                            <View debug={debug} style={stylesHeader.row}>
                                <Text style={[stylesHeader.rowsTitle, {width: 365, textAlign: "left", paddingLeft: 5}]}>Smart Plumbing Solutions Pty Ltd</Text>
                                <Text style={[stylesHeader.rowsTitle, {width: 210}]}>{qa.qa_type}</Text>
                                <Text style={[stylesHeader.rowsTitle, {width: 210}]}>Q.A Sign Off</Text>
                            </View>
                            <View debug={debug} style={stylesHeader.row}>
                                <Text style={[stylesHeader.rowsDetail, {width: 525, textAlign: "left", paddingLeft: 5}]}>Revision No: {qa.revision}</Text>
                                <Text style={[stylesHeader.rowsDetail, {width: 260}]}>Date of Update: {qa.updated_at}</Text>
                            </View>
                            <View debug={debug} style={stylesHeader.row}>
                                <Text style={[stylesHeader.rowsDetail, {width: 50, textAlign: "left", paddingLeft: 5, borderRight: 0, height:50 }]}>Project:</Text>
                                <Text style={[stylesHeader.rowsDetail, {width: 90, borderLeft: 0, height:50, fontSize: 10}]}>{qa.job}</Text>
                                <Text style={[stylesHeader.rowsDetail, {width: 63, textAlign: "left", paddingLeft: 5, borderRight: 0, height:50 }]}>Customer:</Text>
                                <Text style={[stylesHeader.rowsDetail, {width: 165, borderLeft: 0, height:50, fontSize: 10, paddingTop: 5}]}>{qa.customer}</Text>
                                <Text style={[stylesHeader.rowsDetail, {width: 78, textAlign: "left", paddingLeft: 5, borderRight: 0, height:50 }]}>Unit/Area No:</Text>
                                <Text style={[stylesHeader.rowsDetail, {width: 90, borderLeft: 0, height:50, fontSize: 10, paddingTop: 5}]}>{qa.unit_area}</Text>
                                <Text style={[stylesHeader.rowsDetail, {width: 80, textAlign: "left", paddingLeft: 5, borderRight: 0, borderLeft: 0, borderBottom: 0}]}>Site Manager:</Text>
                                <Text style={[stylesHeader.rowsDetail, {position: 'absolute', right: '12%', width: 75, borderLeft: 0, fontSize: 10, paddingTop: 5, borderBottom: 0}]}>{qa.site_manager}</Text>
                                <Text style={[stylesHeader.rowsDetail, {position: 'absolute', right: '0%', width: 95, textAlign: "left", paddingLeft: 5, borderLeft: 0, borderBottom: 0}]}>Distribution</Text>
                                <Text style={[stylesHeader.rowsDetail, {position: 'absolute', right: '21.6%', top: '60%', width: 78, textAlign: "left", paddingLeft: 5, borderRight: 0, borderLeft: 0, borderTop: 0}]}>Foreman:</Text>
                                <Text style={[stylesHeader.rowsDetail, {position: 'absolute', right: '12%', top: '60%',width: 78, borderLeft: 0, fontSize: 8, paddingTop: 5, borderTop: 0, borderRight: 0}]}>{qa.foreman}</Text>

                                <Text style={[stylesHeader.rowsDetail, {position: 'absolute', right: '6.4%', top: '39%', width: 45, textAlign: "left", paddingLeft: 2, borderBottom: 0, fontSize: 10}]}>Builder</Text>
                                <Text style={[stylesHeader.rowsDetail, {position: 'absolute', right: '0%', top: '39%', width: 50, textAlign: "left", paddingLeft: 2, borderLeft: 0, borderBottom: 0, fontSize: 10}]}>Reg Auth.</Text>
                                <Text style={[stylesHeader.rowsDetail, {position: 'absolute', right: '6.4%', top: '60%', width: 45, textAlign: "left", paddingTop: 5, paddingLeft: 2, borderTop: 0, fontSize: 10}]}>Client</Text>
                                <Text style={[stylesHeader.rowsDetail, {position: 'absolute', right: '0%', top: '60%', width: 52, textAlign: "left", paddingTop: 5, paddingLeft: 2, borderTop: 0, fontSize: 10}]}>Engineer</Text>

                            </View>
                            <View debug={debug} style={stylesHeader.row}>
                                <Text style={[stylesHeader.rowsDetail, {width: 785, textAlign: "left", paddingLeft: 5}]}>Location: {qa.location}</Text>
                            </View>
                            <View>
                            <TableHeader>
                                    <TableCell style={{textAlign: 'center', fontSize: 10}}  weighting={widthLargeCols}>Activity</TableCell>
                                    <TableCell style={{textAlign: 'center', fontSize: 10}}  weighting={widthSmallCols}>A/T</TableCell>
                                    <TableCell style={{textAlign: 'center', fontSize: 10}}  weighting={widthLargeCols}>Criteria Requirements</TableCell>
                                    <TableCell style={{textAlign: 'center', fontSize: 10}}  weighting={widthSmallCols}>Reference</TableCell>
                                    <TableCell style={{textAlign: 'center', fontSize: 10}}  weighting={widthSmallCols}>Yes / No</TableCell>
                                    <TableCell style={{textAlign: 'center', fontSize: 10}}  weighting={widthSmallCols}>Installed By</TableCell>
                                    <TableCell style={{textAlign: 'center', fontSize: 10}}  weighting={widthSmallCols}>Checked By</TableCell>
                                    <TableCell style={{textAlign: 'center', fontSize: 10}}  weighting={widthSmallCols}>Date</TableCell>
                            </TableHeader>
                            </View>
                        </View>
                        <View>

                        <Table data={data.activities}>
                                <TableBody>
                                    <DataTableCell getContent={(r) => `(${r.order}) ${r.description}`} style={[stylesTable.cell, {textAlign: 'left', paddingLeft: 2}]}   weighting={widthLargeCols}/>
                                    <DataTableCell getContent={(r) => r.at} style={stylesTable.cell}            weighting={widthSmallCols}/>
                                    <DataTableCell getContent={(r) => r.requirements} style={[stylesTable.cell, {textAlign: 'left', paddingLeft: 2}]}  weighting={widthLargeCols}/>
                                    <DataTableCell getContent={(r) => r.reference} style={stylesTable.cell}     weighting={widthSmallCols}/>
                                    <DataTableCell getContent={(r) => r.yes_no} style={stylesTable.cell}        weighting={widthSmallCols}/>
                                    <DataTableCell getContent={(r) => r.installed_by} style={stylesTable.cell}  weighting={widthSmallCols}/>
                                    <DataTableCell getContent={(r) => r.checked_by} style={stylesTable.cell}    weighting={widthSmallCols}/>
                                    <DataTableCell getContent={(r) => r.activity_date} style={stylesTable.cell} weighting={widthSmallCols}/>
                                </TableBody>
                            </Table>
                        </View>
                        <View debug={debug} style={stylesHeader.row}>
                                <Text style={[stylesHeader.rowsDetail, {width: 785, textAlign: "center", paddingLeft: 5, fontSize: 10}]}>Random=R Verify=V Hold=H Submit=S Inspect=I Witness Points=W Comments=C Notification Point=N</Text>
                        </View>
                        <View debug={debug}>
                                <Text style={[stylesHeader.rowsDetail, {width: 785, textAlign: "left", paddingLeft: 5, fontSize: 10, borderBottom: 0}]}>COMMENTS</Text>
                        </View>
                        <View debug={debug}>
                                <Text wrap={true} style={[stylesHeader.rowsDetail, {width: 785, textAlign: "left", paddingLeft: 5, fontSize: 9, height: 90, maxheight: 90, borderBottom: 0, borderTop: 0}]}>{qa.comments}</Text>
                        </View>
                        <View debug={debug}>
                                <Text style={[stylesHeader.rowsDetail, {width: 785, textAlign: "left", paddingLeft: 5, fontSize: 10, borderBottom: 0}]}>Approved By</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                                    <Text style={[stylesHeader.rowsDetail, {width: (785/4), textAlign: "left", paddingLeft: 5, fontSize: 10, borderBottom: 0}]}>Name: {qa.approved_name_1} </Text>
                                    <Text style={[stylesHeader.rowsDetail, {width: (785/4), textAlign: "left", paddingLeft: 5, fontSize: 10, borderBottom: 0}]}>Company: {qa.approved_company_1} </Text>
                                    <Text style={[stylesHeader.rowsDetail, {width: 785/4, textAlign: "left", paddingLeft: 5, fontSize: 10, borderBottom: 0}]}>Position: {qa.approved_position_1}</Text>
                                    <Text style={[stylesHeader.rowsDetail, {width: 785/4, textAlign: "left", paddingLeft: 5, fontSize: 10, borderBottom: 0}]}>Signature:</Text>
                                    {qa.approved_sign_1 && <Image style={{ position: 'absolute', right: '5%', top: '0%', width: 100}} src={qa.approved_sign_1}/>}


                        </View>
                        <View style={{flexDirection: 'row'}}>
                                    <Text style={[stylesHeader.rowsDetail, {width: (785/4), textAlign: "left", paddingLeft: 5, fontSize: 10, borderBottom: 0}]}>Name: {qa.approved_name_2} </Text>
                                    <Text style={[stylesHeader.rowsDetail, {width: (785/4), textAlign: "left", paddingLeft: 5, fontSize: 10, borderBottom: 0}]}>Company: {qa.approved_company_2} </Text>
                                    <Text style={[stylesHeader.rowsDetail, {width: 785/4, textAlign: "left", paddingLeft: 5, fontSize: 10, borderBottom: 0}]}>Position: {qa.approved_position_2}</Text>
                                    <Text style={[stylesHeader.rowsDetail, {width: 785/4, textAlign: "left", paddingLeft: 5, fontSize: 10, borderBottom: 0}]}>Signature:</Text>
                                    {qa.approved_sign_2 && <Image style={{ position: 'absolute', right: '5%', top: '0%', width: 100}} src={qa.approved_sign_2}/>}
                        </View>
                        <View style={{flexDirection: 'row'}}>
                                    <Text style={[stylesHeader.rowsDetail, {width: (785/4), textAlign: "left", paddingLeft: 5, fontSize: 10, borderBottom: 0}]}>Name: {qa.approved_name_3} </Text>
                                    <Text style={[stylesHeader.rowsDetail, {width: (785/4), textAlign: "left", paddingLeft: 5, fontSize: 10, borderBottom: 0}]}>Company: {qa.approved_company_3} </Text>
                                    <Text style={[stylesHeader.rowsDetail, {width: 785/4, textAlign: "left", paddingLeft: 5, fontSize: 10, borderBottom: 0}]}>Position: {qa.approved_position_3}</Text>
                                    <Text style={[stylesHeader.rowsDetail, {width: 785/4, textAlign: "left", paddingLeft: 5, fontSize: 10, borderBottom: 0}]}>Signature:</Text>
                                    {qa.approved_sign_3 && <Image style={{ position: 'absolute', right: '5%', top: '0%', width: 100}} src={qa.approved_sign_3}/>}
                        </View>
                        <View style={{flexDirection: 'row'}}>
                                    <Text style={[stylesHeader.rowsDetail, {width: (785/4), textAlign: "left", paddingLeft: 5, fontSize: 10}]}>Name: {qa.approved_name_4} </Text>
                                    <Text style={[stylesHeader.rowsDetail, {width: (785/4), textAlign: "left", paddingLeft: 5, fontSize: 10}]}>Company: {qa.approved_company_4} </Text>
                                    <Text style={[stylesHeader.rowsDetail, {width: 785/4, textAlign: "left", paddingLeft: 5, fontSize: 10}]}>Position: {qa.approved_position_4}</Text>
                                    <Text style={[stylesHeader.rowsDetail, {width: 785/4, textAlign: "left", paddingLeft: 5, fontSize: 10}]}>Signature:</Text>
                                    {qa.approved_sign_4 && <Image style={{ position: 'absolute', right: '5%', top: '0%', width: 100}} src={qa.approved_sign_4}/>}
                        </View>

                    </Page>
                    {data.photos && (
                        data.photos.map(photo => (
                            <Page>
                            <Image style={{ position: 'absolute', right: '10%', left: '10%', top: '5%', width: '80%'}} src={photo.qa_photo}/>
                        </Page>

                        ))
                    )}
                </Document>

            ))}
            </PDFViewer>

        )
        } else {
            return (<h1>Loading...</h1>)
        }
    }
}

export default QaReport