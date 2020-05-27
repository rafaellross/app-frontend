import React, { Component } from "react";

import { Page, Document } from 'react-pdf';

export default class Pdf extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            numPages: null, pageNumber: 1 
        }
        this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
        this.goToPrevPage = this.goToPrevPage.bind(this);
        this.goToNextPage = this.goToNextPage.bind(this);

        
        
    }
    
  

  onDocumentLoadSuccess({ numPages }) {
    this.setState({ numPages });
  };

  goToPrevPage() {
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));      
  }


  goToNextPage() {
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));  
  }
    

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <nav>
          <button onClick={this.goToPrevPage}>Prev</button>
          <button onClick={this.goToNextPage}>Next</button>
        </nav>

        <div style={{ width: '100%' }}>
          <Document
            file="/templates/TFN_declaration_form_signature.pdf"
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={5} width={600}></Page>
        
          </Document>
        </div>

        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}