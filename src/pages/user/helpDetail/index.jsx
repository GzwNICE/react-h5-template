import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { NavBar, Icon } from 'antd-mobile';
import { format } from '@/utils/util';
import intl from 'react-intl-universal';

import styles from './index.less';

class HelpDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      resObj: {}
    };
  }
  componentDidMount() {
    this.getHelpDetail();
  }
  getHelpDetail = () => {
    const { helpDetail } = this.props;
    this.setState(
      () => {
        const params = {
          id: this.state.id
        };
        helpDetail(params).then(({ data: res }) => {
          this.setState({
            resObj: res
          });
        });
      }
    );
  };
  goCenter = () => {
    this.props.history.replace('/help');
  };
  render() {
    return (
      <div className={styles['help-detail']}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          style={{ backgroundColor: '#FF5209' }}
          onLeftClick={() => this.props.history.go(-1)}
        >
          帮助中心
        </NavBar>
        <div className={styles.container}>
          <div className={styles.bread}>
            <span className={styles['b-c1']} onClick={()=>{this.goCenter()}}>帮助中心{">"}</span>
            <span className={styles['b-c2']}>问题详情</span>
          </div>
          <div className={styles.title}>{this.state.resObj.title}</div>
          <div className={styles.date}>{format(this.state.resObj.updateTime)}</div>
          <div className={styles.content} dangerouslySetInnerHTML={{__html:this.state.resObj.text}}></div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
});

const mapDispatch = dispatch => ({
  helpDetail: params => dispatch.user.requestHelpDetail(params),
  // helpCenter: params => dispatch.order.getRefreshList(params),
});

export default connect(mapState, mapDispatch)(HelpDetail);
