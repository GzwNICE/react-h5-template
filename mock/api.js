import mockjs from 'mockjs';
import { parse } from 'url';

const getPosts = (req, res, u) => {
  const dataSource = mockjs.mock({
    'list|10': [
      {
        'userId|1-1000': 1,
        'id|+1': 1,
        'title|+1': [mockjs.Random.ctitle(), mockjs.Random.ctitle(), mockjs.Random.ctitle()],
        'body|+1': [
          mockjs.Random.cparagraph(),
          mockjs.Random.cparagraph(),
          mockjs.Random.cparagraph(),
        ],
      },
    ],
  });

  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    code: 0,
    msg: '请求成功',
    data: {
      ...dataSource,
      pagination: {
        total: 100,
        pageSize,
        current: parseInt(params.currentPage, 10) || 1,
      },
    },
  };

  return res.json(result);
};

const getPostsById = (req, res, u) => {
  const result = {
    'userId|1-1000': 1,
    'id|+1': 1,
    title: mockjs.Random.ctitle(),
    body: mockjs.Random.cparagraph(),
  };

  return res.json(result);
};

const getComments = (req, res, u) => {
  const dataSource = mockjs.mock({
    'list|100': [
      {
        'postId|1-1000': 1,
        'id|+1': 1,
        name: mockjs.Random.ctitle(),
        email: mockjs.Random.email(),
        body: mockjs.Random.cparagraph(),
      },
    ],
  });

  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    code: 0,
    msg: '请求成功',
    data: {
      ...dataSource,
      pagination: {
        total: dataSource.length,
        pageSize,
        current: parseInt(params.currentPage, 10) || 1,
      },
    },
  };

  return res.json(result);
};

const getCommentsById = (req, res, u) => {
  const result = {
    'postId|1-1000': 1,
    'id|+1': 1,
    name: mockjs.Random.title(),
    email: mockjs.Random.email(),
    body: mockjs.Random.cparagraph(),
  };

  return res.json(result);
};

export default {
  'GET /api/posts': getPosts,
  'GET /api/posts/:id': getPostsById,
  'GET /posts/:id/comments': getComments,
  'GET /api/comments': getComments,
  'POST /api/posts': (req, res) => {
    res.send({
      code: 0,
      msg: '请求成功',
      data: {},
    });
  },
  'PUT /api/posts': (req, res) => {
    res.send({
      code: 0,
      msg: '请求成功',
      data: {},
    });
  },
  'PATCH /api/posts': (req, res) => {
    res.send({
      code: 0,
      msg: '请求成功',
      data: {},
    });
  },
  'DELETE /api/posts': (req, res) => {
    res.send({
      code: 0,
      msg: '请求成功',
      data: {},
    });
  },
};
