import React, { useState } from 'react';
import api from '../lib/api';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import InfoTable from './InfoTable';

export const App = () => {

  const [ users, setUsers ] = useState([]);
  const [ projects, setProjects ] = useState([]);
  const [ table, setTable ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(false);

  const changeTable = () => setTable(!table);

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      if(!table){
        const response = await api.getUsersDiff();
        setProjects(projects.concat(response.data));
        setLoading(false);
      }
      else {
        const response = await api.getProjectsDiff();
        setUsers(users.concat(response.data));
        setLoading(false);
      }
    } catch (error){
      setError(true);
      setLoading(false);
    }
  };

  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={2}>
        <InfoTable 
          users={!table ? projects : users} 
          fetchData={fetchData} 
          changeTable={changeTable} 
          loading={loading} 
          error={error} 
          table={table}
        />
      </Box>
    </Container>
  );
};

export default App;
