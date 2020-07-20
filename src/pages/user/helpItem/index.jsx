import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { NavBar, Icon, ListView, List  } from 'antd-mobile';
const Item = List.Item;
import intl from 'react-intl-universal';

import styles from './index.less';

function ListBody(props) {
  return (
      <List>
        <Item>
          <div className={styles['c-t']}>
            <div className={styles['c-t-c1']} onClick={ props.jump }>帮助中心{">"}</div>
            <div className={styles['c-t-c2']}>{props.title}</div>
          </div>
        </Item>
        {props.children}
      </List>
  );
}

class HelpItem extends PureComponent {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      id: this.props.match.params.id,
      dataSource,
      rows: [],
      isLoading: true,
      page: 0,
      size: 10,
      total: null,
      itemTitle: null
    };
  }
  componentDidMount() {
    this.getPageList();
  }
  getPageList = () => {
    if (this.state.rows.length === this.state.total) {
      return false
    };
    const { helpCenterItem } = this.props;
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        const params = {
          id: this.state.id,
          page: this.state.page,
          size: this.state.size,
        };
        helpCenterItem(params).then(({ data: res }) => {
          params.page === 1 ? this.setState({ rows: res.rows }) : this.setState({ rows: this.state.rows.concat(res.rows) })
          this.setState({
            total: res.total,
            itemTitle: res.rows[0].firstTitle,
            dataSource: this.state.dataSource.cloneWithRows(this.state.rows),
          });
          if (this.state.rows.length === this.state.total) {
            this.setState({
              isLoading: false
            });
          };
        });
      }
    );
  };
  goDeatil = d => {
    this.props.history.push(`/helpDetail/${d.id}`);
  };
  goCenter = () => {
    this.props.history.replace('/help');
  };
  render() {
    const { isLoading } = this.state;
    const Row = d => {
      return (
      <Item className={styles['l-item-c1']} arrow="horizontal" onClick={() => (this.goDeatil(d))}>{d.title}</Item>
      );
    };

    return (
      <div className={styles['help-item']}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          帮助中心
        </NavBar>
        <div className={styles.container}>
          { this.state.rows.length ? 
          <ListView
          dataSource={this.state.dataSource}
          className={styles.list}
          renderRow={Row}
          renderBodyComponent={() => <ListBody title={this.state.itemTitle} jump={this.goCenter} />}
          scrollRenderAheadDistance={100}
          onEndReachedThreshold={50}
          initialListSize={20}
          pageSize={10}
          // useBodyScroll
          onEndReached={this.getPageList}
          renderFooter={() => (
            <div style={{ padding: 10, textAlign: 'center' }}>
              {isLoading ? 'Loading...' : intl.get('list.isEnd')}
            </div>
          )}
        /> : null }
          
        </div>
      </div>
    );
  }
}

const mapState = state => ({
});

const mapDispatch = dispatch => ({
  helpCenterItem: params => dispatch.user.requestHelpCenterItem(params),
  // helpCenter: params => dispatch.order.getRefreshList(params),
});

export default connect(mapState, mapDispatch)(HelpItem);
