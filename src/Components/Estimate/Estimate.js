import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box';
import Project from './Project';
import EstimateDetails from './EstimateDetails';
import EstimateSummary from "./EstimateSummary";
import * as API from "../../Api";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}


export default function Estimate(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [loaded, setLoaded] = useState(false)
    const [project, setProject] = useState([])
    const [folders, setFolders] = useState([])


    // ComponentDidMount and componentDidUpdate:
    useEffect(() => {
      if (!loaded) {
          API.get('estimates', props.estimate)
          .then((project) => {
              setProject(project)
          })
          setLoaded(true)
      }});


    return (

        <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Project"/>
          <Tab label="Estimate Details"/>
          <Tab label="Summary" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Project project={{}}/>
        </TabPanel>
      <TabPanel value={value} index={1}>
        <EstimateDetails
        project={project}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EstimateSummary/>
      </TabPanel>

      </Paper>
    )
}
