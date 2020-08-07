import React, { PureComponent } from 'react';
// import { Link } from 'react-router-dom';
import { Carousel, NavBar, Icon } from 'antd-mobile';
import styles from './index.less';

class ImgPreview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selIndex: 1,
      imgHeight: '400px',
    };
  }

  cancelPre = () => {
    this.props.cancel();
  };

  componentDidMount() {
    this.setState({
      selIndex: this.props.index + 1,
    });
  }

  beforeChange = (f, t) => {
    this.setState({
      selIndex: t + 1,
    });
  };

  render() {
    const { data } = this.props;
    const { selIndex, imgHeight } = this.state;
    return (
      <div className={styles.imgPre}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          className={styles.navBar}
          onLeftClick={this.cancelPre}
        >
          {`${selIndex}/${data.length}`}
        </NavBar>
        <div className={styles.imgBox}>
          <Carousel
            autoplay={false}
            infinite
            dots={false}
            selectedIndex={selIndex - 1}
            beforeChange={this.beforeChange}
          >
            {data.map(i => (
              <div style={{ height: imgHeight }} key={i.id}>
                <img
                  src={i.url}
                  alt="img"
                  className={styles.img_pre}
                  onClick={this.cancelPre}
                  onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    );
  }
}

export default ImgPreview;
