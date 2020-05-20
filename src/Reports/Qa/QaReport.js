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
        fontSize: '10pt',
        
    },

    photo: {
        height: '47.85px'
    }
})

const projects = {
      name: '608 Tonkin St Cronulla (Richard Crooks)',
      date: new Date().toLocaleDateString()
}



export class QaReport extends Component {

    constructor(props) {
        super(props)
    
        this.state = {

          data: [],
          isLoading: true
                       
        }
    }

    componentDidMount() {
        API.getAll('q_a_users', this.props.match.params.id)
        .then((qas) => {          
            this.setState(() => ({
                data: qas,
                isLoading: false,
            }))  
        })           
    
    }
    
    


    render() {
        const data = this.state.data;
        if (!this.state.isLoading) {

        
        return (
            <PDFViewer width={'100%'} height={900}>
            {data.map(qa => (
                <Document>
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
                                <Text style={[stylesHeader.rowsDetail, {width: 80, textAlign: "left", paddingLeft: 5, borderRight: 0}]}>Site Manager:</Text>                    
                                <Text style={[stylesHeader.rowsDetail, {width: 80, borderLeft: 0, fontSize: 10, paddingTop: 5}]}>{qa.site_manager}</Text>                                                                  
                            </View>
                            <View debug={debug} style={stylesHeader.row}>
                                <Text style={[stylesHeader.rowsDetail, {width: 50, textAlign: "left", paddingLeft: 5, borderRight: 0, height:50 }]}>Project:</Text>                    
                                <Text style={[stylesHeader.rowsDetail, {width: 90, borderLeft: 0, height:50, fontSize: 10}]}>{qa.job}</Text>                                  
                            </View>
                            <View style={{marginTop: 15}}>
                            <TableHeader >
                                    <TableCell  weighting={0.70}>Reference</TableCell>
                                    <TableCell >Drawing</TableCell>
                                    <TableCell >Photo</TableCell>
                                    <TableCell  >FRL</TableCell>
                                    <TableCell >Installed By</TableCell>
                                    <TableCell >Installation Date</TableCell>
                                    <TableCell >Manufacturer</TableCell>
                            </TableHeader>        
                            </View>        
                        </View>        
                        <View>
                            {/*
                        <Table data={data}>
                                <TableBody>
                                    <DataTableCell getContent={(r) => r.fire_number} style={stylesTable.cell} weighting={0.70}/>
                                    <DataTableCell getContent={(r) => r.drawing} style={stylesTable.cell}/>
                                    <DataTableCell getContent={(r) => <Image style={stylesTable.photo} src={r.fire_photo}/>}/>
                                    <DataTableCell getContent={(r) => r.fire_resist_level} style={stylesTable.cell}/>
                                    <DataTableCell getContent={(r) => r.install_by} style={stylesTable.cell}/>
                                    <DataTableCell getContent={(r) => r.formated_date} style={stylesTable.cell}/>
                                    <DataTableCell getContent={(r) => r.manufacturer} style={stylesTable.cell}/>                                
                                </TableBody>
                            </Table>  
                            */}              
                        </View>
                    </Page>
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