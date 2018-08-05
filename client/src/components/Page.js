import * as React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { I18n } from 'react-i18next';
import Auth from '../modules/Auth';

export default class Page extends React.Component {
    static propTypes = {
        access: PropTypes.oneOf(['public', 'private'])
    };

    static defaultProps = {
        access: 'private',
    };

    render() {
        const {access, children} = this.props;
        if (access !== 'public' && !Auth.isUserAuthenticated()) {
            return <Redirect to="/login" />;
        }
        return (
          <I18n>
            {
              (t, { i18n }) => (
                <div>
                  <div className="top-bar">
                    <div className="top-bar-left">
                      <Link to="/">React App</Link>
                    </div>
                    <div className="top-bar-right">
                      <button
                        onClick={() => { i18n.changeLanguage('en'); }}
                      >
                        EN
                      </button>
                    </div>
                    <div className="top-bar-right">
                      <button
                        onClick={() => { i18n.changeLanguage('cz'); }}
                      >
                        CZ
                      </button>
                    </div>
                    {
                      Auth.isUserAuthenticated()
                        ? (
                            <div className="top-bar-right">
                              <Link to="/logout">{t('log-out')}</Link>
                            </div>
                          )
                        : (
                            <div className="top-bar-right">
                              <Link to="/login">{t('log-in')}</Link>
                              <Link to="/signup">{t('sign-up')}</Link>
                            </div>
                          )
                    }
                  </div>
                  {children}
                </div>
              )
            }
          </I18n>
        );
    }
}
