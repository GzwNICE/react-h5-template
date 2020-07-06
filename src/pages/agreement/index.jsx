/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import queryString from 'query-string';
// import Cookies from 'js-cookie';
// import intl from 'react-intl-universal';
import { NavBar, Icon } from 'antd-mobile';
// import { createForm } from 'rc-form';
// import { getBaseUrl } from '@/utils/util';
// import passwordClose from '@/assets/images/passwordClose.png';
// import passwordOpen from '@/assets/images/passwordOpen.png';
import styles from './index.less';

class Agreement extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.match.params.type,
      title: '',
      content: '',
    };
  }

  componentDidMount() {
    this.agreement();
    this.changeTitle();
  }

  changeTitle = () => {
    const { type } = this.state;
    let t = '';
    switch (type) {
      case '0':
        t = '用户协议';
        break;
      case '1':
        t = '注册协议';
        break;
      case '2':
        t = '隐私协议';
        break;
      case '3':
        t = '免责声明';
        break;
      case '4':
        t = '充值协议';
        break;
      case '5':
        t = '兑换协议';
        break;
      default:
        t = '';
    }
    this.setState({
      title: t,
    });
  };

  agreement = () => {
    const { fetchAgr } = this.props;
    const { type } = this.state;
    fetchAgr({ type }).then(res => {
      if (res.code === 200) {
        this.setState({
          content: res.data.content,
        });
      }
    });
  };

  render() {
    const { title, content } = this.state;
    const html = { __html: content };
    return (
      <div className={styles.agreement}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className={styles.navbar}
          onLeftClick={() => {
            this.props.history.go(-1);
          }}
        >
          {title}
        </NavBar>
        <div className={styles.agrContent} dangerouslySetInnerHTML={html}></div>
      </div>
    );
  }
}

const mapState = state => ({});

const mapDispatch = dispatch => ({
  fetchAgr: params => dispatch.register.getAgr(params),
});

export default connect(mapState, mapDispatch)(Agreement);
