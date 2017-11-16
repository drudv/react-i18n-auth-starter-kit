import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { I18n } from 'react-i18next';
import Auth from '../modules/Auth';


const Base = ({ children }) => (
  <I18n>
    {
      (t, { i18n }) => (
        <div>
          <div className="top-bar">
            <div className="top-bar-left">
              <IndexLink to="/">React App</IndexLink>
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

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
