import React, { PureComponent } from 'react';
// import intl from 'react-intl-universal';
import { Modal } from 'antd-mobile';
// import { Link } from 'react-router-dom';
import queryString from 'query-string';
// import hotImg from '@/assets/images/label_hot.png';
import styles from './index.less';

const { lang } = queryString.parse(window.location.search);
class LuckyCode extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modal1: true,
    };
  }

  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  };

  render() {
    // const { data } = this.props;
    return (
      <div className={styles.card}>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title="Title"
          footer={[
            {
              text: 'Ok',
              onPress: () => {
                console.log('ok');
                this.onClose('modal1')();
              },
            },
          ]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          afterClose={() => {
            alert('afterClose');
          }}
        >
          <div style={{ height: 100, overflow: 'scroll' }}>
            scoll content...<br />
            scoll content...<br />
            scoll content...<br />
            scoll content...<br />
            scoll content...<br />
            scoll content...<br />
          </div>
        </Modal>
      </div>
    );
  }
}

export default LuckyCode;
