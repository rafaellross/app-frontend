import React, { Component } from 'react'
import  DevDataTable from '../../Components/DataTable/DevDataTable'
import * as API from '../../Api'

class Home extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            isLoading: true,
            rows: [],
            columns: [
                    
                { title: '#', name: 'id'},
                { title: 'Code', name: 'code' },
                { title: 'Description', name: 'description'},
                { title: 'Address', name: 'address'},
                {
                    name: 'inactive',
                    title: 'Active Job?',                
                },
            
                {
                    name: 'edit',
                    title: 'Edit',
                } ,
                {
                    name: 'fire_register',
                    title: 'Fire Register',
                } ,
                           
            
                
            ]         
                 
        }
    }

    componentDidMount() {

        
        let isLoading = true
        
        API.getAll('jobs')
        .then((data) => {      
            this.setState(() => ({
                rows: data,
                isLoading: false
            }))                
                
        })    
        
        
    }
    render() {

        if (this.state.isLoading) {
            return (
                <h3>Loading...</h3>
            )
        }

        return (
            <div>
                <DevDataTable rows={this.state.rows} isLoading={this.state.isLoading} columns={this.state.columns}/>
            </div>
        )
    }
}

export default Home
