import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Layout, List, Menu } from 'antd';
import { push } from 'connected-react-router';

const { Header, Content, Footer } = Layout;

class TopicPage extends PureComponent {
  static defaultProps = {
    title: '话题列表',
  };

  componentDidMount() {
    const { fetch } = this.props;
    fetch({});
  }

  handleGo = () => {
    const { go } = this.props;
    go();
  };

  render() {
    const { topic, fetch, title } = this.props;
    return (
      <Layout className="layout">
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">话题列表</Menu.Item>
            <Menu.Item key="2" onClick={this.handleGo}>
              评论列表
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <List
              pagination={{
                onChange: page => {
                  fetch({
                    current: page,
                    pageSize: 10,
                  });
                },
                total: topic.data.pagination.total,
                pageSize: topic.data.pagination.pageSize,
              }}
              itemLayout="horizontal"
              dataSource={topic.data.list}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <span>
                        {item.title} <Link to={`/comments/${item.id}`}>查看评论</Link>
                      </span>
                    }
                    description={item.body}
                  />
                </List.Item>
              )}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>{title}</Footer>
      </Layout>
    );
  }
}

const mapState = state => ({
  topic: state.topic,
  loading: state.loading.effects.topic.fetchAsync,
});

const mapDispatch = dispatch => ({
  fetch: params => dispatch.topic.fetchAsync(params),
  add: params => dispatch.topic.addAsync(params),
  update: params => dispatch.topic.updateAsync(params),
  delete: id => dispatch.topic.deleteAsync(id),
  go: () => dispatch(push('/comments')),
});

export default connect(
  mapState,
  mapDispatch
)(TopicPage);
