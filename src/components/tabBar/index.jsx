import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex } from 'antd-mobile';
import intl from 'react-intl-universal';
import Cookies from 'js-cookie';
import { push } from 'connected-react-router';
// import UserPage from '@/pages/user';
// import HomePage from '@/pages/home';
import homeSelPng from '@/assets/images/home_selected.png';
import homePng from '@/assets/images/home.png';
import personal from '@/assets/images/personal.png';
import personalSel from '@/assets/images/personal_selected.png';
import styles from './index.less';

class TabBarBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      IPhoneX: Cookies.get('IPhoneX'),
    };
  }

  // render() {
  //   const { selectedTab } = this.state;
  //   const { goHome, goUser } = this.props;
  //   return (
  //     <div className={styles.tabBox}>
  //       <TabBar
  //         unselectedTintColor="#AEAEAE"
  //         tintColor="#FE5108"
  //         barTintColor="white"
  //         style={{ position: 'fixed' }}
  //       >
  //         <TabBar.Item
  //           title="首页"
  //           key="homePage"
  //           icon={
  //             <div
  //               style={{
  //                 width: '22px',
  //                 height: '22px',
  //                 background: `url(${homePng}) center center /  21px 21px no-repeat`,
  //               }}
  //             />
  //           }
  //           selectedIcon={
  //             <div
  //               style={{
  //                 width: '22px',
  //                 height: '22px',
  //                 background: `url(${homeSelPng}) center center /  21px 21px no-repeat`,
  //               }}
  //             />
  //           }
  //           selected={selectedTab === 'homePage'}
  //           onPress={() => {
  //             this.setState({
  //               selectedTab: 'homePage',
  //             });
  //           }}
  //           data-seed="logId"
  //         ></TabBar.Item>
  //         <TabBar.Item
  //           icon={
  //             <div
  //               style={{
  //                 width: '22px',
  //                 height: '22px',
  //                 background: `url(${personal}) center center /  21px 21px no-repeat`,
  //               }}
  //             />
  //           }
  //           selectedIcon={
  //             <div
  //               style={{
  //                 width: '22px',
  //                 height: '22px',
  //                 background: `url(${personalSel}) center center /  21px 21px no-repeat`,
  //               }}
  //             />
  //           }
  //           title="我的"
  //           key="userPage"
  //           selected={selectedTab === 'userPage'}
  //           onPress={() => {
  //             this.setState({
  //               selectedTab: 'userPage',
  //             });
  //           }}
  //           data-seed="logId1"
  //         ></TabBar.Item>
  //       </TabBar>
  //     </div>
  //   );
  // }
  render() {
    const { selectedTab, search } = this.props;
    const IPhoneX = Cookies.get('IPhoneX');
    return (
      <div className={`${styles.tabBox} ${IPhoneX ? `${styles.tabBoxIPhone}` : null}`}>
        <Flex>
          <Flex.Item className={styles.Item}>
            <Link
              to={{
                pathname: '/home',
                search: `${search}`,
              }}
            >
              {selectedTab === 'homePage' ? (
                <img src={homeSelPng} alt="" />
              ) : (
                <img src={homePng} alt="" />
              )}
              <span style={{ color: selectedTab === 'homePage' ? '#FE5108' : '#AEAEAE' }}>
                {intl.get('home.home')}
              </span>
            </Link>
          </Flex.Item>
          <Flex.Item className={styles.Item}>
            <Link
              to={{
                pathname: '/user',
                search: `${search}`,
              }}
            >
              {selectedTab === 'userPage' ? (
                <img src={personalSel} alt="" />
              ) : (
                <img src={personal} alt="" />
              )}
              <span style={{ color: selectedTab === 'userPage' ? '#FE5108' : '#AEAEAE' }}>
                {intl.get('home.user')}
              </span>
            </Link>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  goHome: () => dispatch(push('/home')),
  goUser: () => dispatch(push('/user')),
});

export default connect(mapDispatch)(TabBarBox);
