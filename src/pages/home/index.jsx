import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Button } from 'antd-mobile';
import intl from 'react-intl-universal';
import { push } from 'connected-react-router';
import styles from './index.less';
// const { Header, Content, Footer } = Layout;

class homePage extends PureComponent {
  static defaultProps = {
    title: '话题列表',
  };

  componentDidMount() {
    console.log(111, this.props);
    // const { fetch } = this.props;
    // fetch({});
  }

  handleGo = () => {
    // const { go } = this.props;
    // go();
  };

  render() {
    return (
      <div>
        <div>{intl.get('home.title')}</div>
        <Button type="primary" className={styles.btn}>
          button
        </Button>
      </div>
    );
  }
}

const mapState = state => ({
  // topic: state.topic,
  // loading: state.loading.effects.topic.fetchAsync,
});

const mapDispatch = dispatch => ({
  // fetch: params => dispatch.topic.fetchAsync(params),
  // add: params => dispatch.topic.addAsync(params),
  // update: params => dispatch.topic.updateAsync(params),
  // delete: id => dispatch.topic.deleteAsync(id),
  // go: () => dispatch(push('/comments')),
});

export default connect(mapState, mapDispatch)(homePage);
