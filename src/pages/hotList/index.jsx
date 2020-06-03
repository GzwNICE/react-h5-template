import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ActivityCard from '@/components/activityCard';
import { Flex } from 'antd-mobile';
import styles from './index.less';
// import { ListView } from 'antd-mobile';

class HotList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      size: 20
    };
  }

  componentDidMount() {
    this.getPageList();
  }

  getPageList = () => {
    const { getList } = this.props;
    this.setState({
      page: this.state.page + 1,
    },
      () => {
        const params = {
          page: this.state.page,
          size: this.state.size,
        };
        getList(params);
      }
    );
  };

  render() {
    const { hotList } = this.props;
    return (
      <div className={styles.hotPage}>
        {hotList.map((i, index) => {
          return <div className={styles.hotItem}><ActivityCard data={i} key={index} hot /></div>;
        })}
      </div>
    );
  }
}

const mapState = state => ({
  hotList: state.home.data.hotList,
});

const mapDispatch = dispatch => ({
  getList: params => dispatch.home.fetchGetHotList(params),
});

export default connect(mapState, mapDispatch)(HotList);
