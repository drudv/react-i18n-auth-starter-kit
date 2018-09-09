import * as React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { I18n } from 'react-i18next';
import Auth from '../modules/Auth';
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Button } from 'antd';
import styles from './Page.less';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const supportedLanguages = [
  { name: 'cz', title: 'CZ' },
  { name: 'en', title: 'EN' },
];

const languageMenu = i18n => (
  <Menu
    selectedKeys={[i18n.language]}
    onClick={event => i18n.changeLanguage(event.key)}
  >
    {supportedLanguages.map(language => (
      <Menu.Item key={language.name}>{language.title}</Menu.Item>
    ))}
  </Menu>
);

export default class Page extends React.Component {
  static propTypes = {
    access: PropTypes.oneOf(['public', 'private']),
    selectedMenuItem: PropTypes.oneOf(['dashboard']),
  };

  static defaultProps = {
    access: 'private',
  };

  render() {
    const { access, children, selectedMenuItem } = this.props;
    if (access !== 'public' && !Auth.isUserAuthenticated()) {
      return <Redirect to="/login" />;
    }
    return (
      <I18n>
        {(t, { i18n }) => (
          <Layout>
            <Header className={styles.header}>
              <div className={styles.header__logo}>
                <Link to="/">React App</Link>
              </div>
              <Menu
                className={styles.header__menu}
                theme="dark"
                mode="horizontal"
                selectedKeys={selectedMenuItem ? [selectedMenuItem] : null}
                style={{ lineHeight: '64px' }}
              >
                {Auth.isUserAuthenticated() && (
                  <Menu.Item key="dashboard">
                    <Link to="/dashboard">{t('dashboard')}</Link>
                  </Menu.Item>
                )}
              </Menu>
              <div className={styles.header__right}>
                <Dropdown overlay={languageMenu(i18n)}>
                  <Button style={{ marginLeft: 8 }}>
                    {
                      supportedLanguages.find(lng => lng.name === i18n.language)
                        .title
                    }
                    <Icon type="down" />
                  </Button>
                </Dropdown>
                <div className={styles['header__user-actions']}>
                  {Auth.isUserAuthenticated() ? (
                    <Link to="/logout">{t('log-out')}</Link>
                  ) : (
                    <React.Fragment>
                      <Link to="/login">{t('log-in')}</Link>
                      <Link to="/signup">{t('sign-up')}</Link>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </Header>
            <Content className={styles.content}>{children}</Content>
            <Footer style={{ textAlign: 'center' }}>
              react-i18n-auth-starter-kit © 2018
            </Footer>
          </Layout>
        )}
      </I18n>
    );
  }
}
