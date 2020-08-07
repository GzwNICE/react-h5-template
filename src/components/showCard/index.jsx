import React, { PureComponent } from 'react';
// import { Link } from 'react-router-dom';
import { Badge, Grid } from 'antd-mobile';
import { format } from '@/utils/util';
import like from '@/assets/images/like.png';
import liked from '@/assets/images/liked.png';
import styles from './index.less';

class ShowCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      a: false,
    };
  }

  preview(list, index) {
    this.props.preview(list, index);
  }

  handlerLick(id, like) {
    const { onLikeClick } = this.props;
    onLikeClick(id, like);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      a: !this.state.a,
    });
  }

  render() {
    const { data } = this.props;
    const { a } = this.state;
    return (
      <div className={styles.showCard}>
        <div className={styles.head}>
          <img src={data.user.photoUrl} alt="" className={styles.userPic} />
          <div className={styles.rightBox}>
            <p className={styles.userName}>{data.user.name}</p>
            <p className={styles.prodName}>{`【第${data.rounds}轮】${data.productName}`}</p>
          </div>
        </div>
        <div className={styles.content}>
          {data.type === 3 ? (
            <Badge
              text="置顶"
              style={{
                padding: '1px 3px',
                backgroundColor: '#febd52',
                borderRadius: 2,
                marginRight: '6px',
                zIndex: 0,
              }}
            />
          ) : null}
          {data.type === 2 ? (
            <Badge
              text="精华"
              style={{
                padding: '1px 3px',
                backgroundColor: '#fd7f4a',
                borderRadius: 2,
                marginRight: '6px',
                zIndex: 0,
              }}
            />
          ) : null}
          {data.type === 4 ? (
            <span>
              <Badge
                text="置顶"
                style={{
                  padding: '1px 3px',
                  backgroundColor: '#febd52',
                  borderRadius: 2,
                  marginRight: '6px',
                  zIndex: 0,
                }}
              />
              <Badge
                text="精华"
                style={{
                  padding: '1px 3px',
                  backgroundColor: '#fd7f4a',
                  borderRadius: 2,
                  marginRight: '6px',
                  zIndex: 0,
                }}
              />
            </span>
          ) : null}
          <span className={styles.text}>{data.content}</span>
        </div>
        <Grid
          data={data.imgList}
          columnNum={4}
          hasLine={false}
          className={styles.imgBox}
          activeStyle={false}
          renderItem={(dataItem, index) => (
            <div style={{ marginRight: '0.1rem' }}>
              <img
                src={dataItem.url}
                className={styles.imgItem}
                alt="img"
                onClick={() => this.preview(data.imgList, index)}
              />
            </div>
          )}
        />
        {a ? <div></div> : null}
        <div className={styles.foot}>
          <div className={styles.left} onClick={() => this.handlerLick(data.id, data.isLike)}>
            <img src={data.isLike ? liked : like} alt="" />
            <span>{data.likeCount}</span>
          </div>
          <span className={styles.time}>{format(data.createTime)}</span>
        </div>
      </div>
    );
  }
}

export default ShowCard;
