import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Layout, List, Menu } from 'antd';
import { push } from 'connected-react-router';

import CreateForm from '@/pages/comments/CreateForm';

const { Header, Content, Footer } = Layout;

const CommentPage = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [current, setCurrent] = useState({
    postId: 0,
    id: 0,
    name: '',
    email: '',
    body: '',
  });

  const {
    match: {
      params: { id },
    },
  } = props;

  useEffect(() => {
    props.fetch({ id });
  }, []);

  const handleShowModal = () => {
    setModalVisible(true);
    setCurrent({
      postId: id,
      id: 0,
      name: '',
      email: '',
      body: '',
    });
  };

  const handleGo = () => {
    const { go } = props;
    go();
  };

  const handleAdd = args => {
    console.log(args);
    setModalVisible(false);
    props.fetch({ id });
  };

  const handleEdit = args => {
    console.log(args);
    setModalVisible(false);
    props.fetch({ id });
  };

  const handleModalVisible = args => {
    setModalVisible(args);
  };

  const handleSetCurrent = args => {
    setCurrent(args);
    setModalVisible(true);
  };

  const parentMethods = {
    onAdd: handleAdd,
    onEdit: handleEdit,
    onModalVisible: handleModalVisible,
  };

  const { title, comment } = props;

  return (
    <Layout className="layout">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1" onClick={handleGo}>
            话题列表
          </Menu.Item>
          <Menu.Item key="2">评论列表</Menu.Item>
          <Menu.Item key="3" onClick={handleShowModal}>
            新增评论
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <List
            itemLayout="horizontal"
            dataSource={comment.data.list}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <span>
                      {item.name}{' '}
                      <a href="#" onClick={() => handleSetCurrent(item)}>
                        编辑
                      </a>
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
      <CreateForm {...parentMethods} modalVisible={modalVisible} current={current} />
    </Layout>
  );
};

const defaultProps = {
  title: '评论列表',
};

CommentPage.defaultProps = defaultProps;

const mapState = (state, ownProps) => ({
  comment: state.comment,
  match: ownProps.match,
});

const mapDispatch = dispatch => ({
  fetch: params => dispatch.comment.fetchAsync(params),
  go: () => dispatch(push('/')),
});

export default connect(
  mapState,
  mapDispatch
)(CommentPage);
