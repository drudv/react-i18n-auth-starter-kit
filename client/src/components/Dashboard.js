import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';


const Dashboard = ({ secretData }) => (
  <Card className="container">
    <h1>Dashboard</h1>
    <p>This is page is visible only for authenticated users.</p>
    <p>Secret data: {secretData}</p>
  </Card>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;
