/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
import { NavBar, Icon } from 'antd-mobile';
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
        t = `${intl.get('agreement.user')}`;
        break;
      case '1':
        t = `${intl.get('agreement.registration')}`;
        break;
      case '2':
        t = `${intl.get('agreement.privacy')}`;
        break;
      case '3':
        t = `${intl.get('agreement.disclaimer')}`;
        break;
      case '4':
        t = `${intl.get('agreement.recharge')}`;
        break;
      case '5':
        t = `${intl.get('agreement.exchange')}`;
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
