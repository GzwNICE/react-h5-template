/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { NavBar, Icon, ListView } from 'antd-mobile';
import intl from 'react-intl-universal';

import styles from './index.less';

class Help extends PureComponent {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      rows: [],
      isLoading: true,
      page: 0,
      size: 10,
      total: null,
    };
  }
  componentDidMount() {
    const isLogin = localStorage.getItem('mobile');
    if (!isLogin) {
      this.props.history.push(`/login`);
      return;
    }
  }
  getPageList = () => {
    if (this.state.rows.length === this.state.total) {
      this.setState({
        isLoading: false,
      });
      return false;
    }
    const { helpCenter } = this.props;
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        const params = {
          page: this.state.page,
          size: this.state.size,
        };
        helpCenter(params).then(({ data: res }) => {
          params.page === 1
            ? this.setState({ rows: res.rows })
            : this.setState({ rows: this.state.rows.concat(res.rows) });
          this.setState({
            total: res.total,
            dataSource: this.state.dataSource.cloneWithRows(this.state.rows),
          });
        });
      }
    );
  };
  goItem = d => {
    this.props.history.push(`/helpItem/${d.id}`);
  };
  goDetail = d => {
    this.props.history.push(`/helpDetail/${d.id}`);
  };
  render() {
    const { isLoading } = this.state;
    const Row = d => {
      return (
        <div className={styles.item}>
          {/* <div className={styles['i-l']}>{d.title}</div> */}
          <div
            className={styles.l}
            onClick={() => {
              this.goItem(d);
            }}
          >
            <img src={d.url} className={styles['l-i']} />
            <div className={styles['l-c']}>{d.title}</div>
          </div>
          <div className={styles.r}>
            {/* <div>{d.textList}</div> */}
            {/* {d.textList.map( (item) => {return <div class="r-i">{item.title}</div>} )} */}
            {d.textList && d.textList.length
              ? d.textList.map(item => {
                  return (
                    <div
                      key={item.id}
                      className={styles['r-i']}
                      onClick={() => {
                        this.goDetail(item);
                      }}
                    >
                      {item.title}
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      );
    };

    return (
      <div className={styles.help}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          {intl.get('user.help')}
        </NavBar>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.tip}>
              <div className={styles.c1}>{intl.get('user.help')}</div>
              <div className={styles.c2}>{intl.get('user.helpText')}</div>
            </div>
          </div>
          <ListView
            ref={el => (this.lv = el)}
            dataSource={this.state.dataSource}
            className={styles.list}
            renderRow={Row}
            scrollRenderAheadDistance={100}
            onEndReachedThreshold={50}
            initialListSize={20}
            pageSize={10}
            onEndReached={this.getPageList}
            renderFooter={() => (
              <div style={{ padding: 10, textAlign: 'center' }}>
                {isLoading ? 'Loading...' : intl.get('list.isEnd')}
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({
  helpCenter: params => dispatch.user.requestHelpCenter(params),
});

export default connect(mapState, mapDispatch)(Help);
