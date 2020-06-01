import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Button, TabBar, Icon } from 'antd-mobile';
import intl from 'react-intl-universal';
import { push } from 'connected-react-router';
import UserPage from '../user'
import styles from './index.less';
// const { Header, Content, Footer } = Layout;

class homePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
      fullScreen: false,
    };
  }
  componentDidMount() {
    console.log(111, this.props);
    console.log(111, this.props.location.search);
    // const { fetch } = this.props;
    // fetch({});
  }

  handleGo = () => {
    // const { go } = this.props;
    // go();
  };
  // <div>{intl.get('home.title')}</div>
  //       <Button type="primary" className={styles.btn}>
  //         button
  //       </Button>

  render() {
    const { selectedTab, hidden } = this.state;
    const { home } = this.props;
    console.log(home);
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#AEAEAE"
          tintColor="#FE5108"
          barTintColor="white"
          hidden={hidden}
        >
          <TabBar.Item
            title="首页"
            key="homePage"
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            selected={selectedTab === 'blueTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            123123
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            title="我的"
            key="userPage"
            selected={selectedTab === 'userPage'}
            onPress={() => {
              this.setState({
                selectedTab: 'userPage',
              });
            }}
            data-seed="logId1"
          >
            <UserPage />
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

const mapState = state => ({
  // topic: state.topic,
  // loading: state.loading.effects.topic.fetchAsync,
  home: state.home.data,
});

const mapDispatch = dispatch => ({
  fetch: params => dispatch.home.fetchAsync(params),
  // add: params => dispatch.topic.addAsync(params),
  // update: params => dispatch.topic.updateAsync(params),
  // delete: id => dispatch.topic.deleteAsync(id),
  // go: () => dispatch(push('/comments')),
});

export default connect(mapState, mapDispatch)(homePage);
