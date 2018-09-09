import React from 'react';
import Auth from '../modules/Auth';
import Page from '../components/Page';
import { I18n } from 'react-i18next';

class DashboardPage extends React.Component {
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          secretData: xhr.response.message,
        });
      }
    });
    xhr.send();
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <I18n>
        {(t, { i18n }) => (
          <Page selectedMenuItem="dashboard">
            <h1>{t('dashboard')}</h1>
            <p>This is page is visible only for authenticated users.</p>
            <p>Secret data: {this.state.secretData}</p>
          </Page>
        )}
      </I18n>
    );
  }
}

export default DashboardPage;
