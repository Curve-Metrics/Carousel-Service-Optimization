import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

class ImagePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.listing.imageurl,
      // currentImageIndex: 0,
      // lastIndex: (props.listing.images.length - 1),
      hovered: false,
      liked: props.listing.liked,
      listingId: props.listing._id,
      isNewListing: props.listing.isNewListing,
      forSaleByOwner: props.listing.forSaleByOwner,
    };
    // this.handleImageClick = this.handleImageClick.bind(this);
    this.likeOrUnlike = this.likeOrUnlike.bind(this);
    this.handleMouseHover = this.handleMouseHover.bind(this);
  }

  // handleImageClick() {
  //   const { currentImageIndex, lastIndex } = this.state;
  //   if (currentImageIndex === lastIndex) {
  //     this.setState({ currentImageIndex: 0 });
  //   } else {
  //     const nextIndex = currentImageIndex + 1;
  //     this.setState({ currentImageIndex: nextIndex });
  //   }
  //   this.render();
  // }

  handleMouseHover() {
    const { hovered } = this.state;
    this.setState({
      hovered: !hovered,
    });
  }

  zoomOnHover() {
    const { images, hovered } = this.state;
    if (hovered) {
      return (
        <img
          className="zoomedImage"
          src={images}
          alt="zoomedImage"
        />
      );
    }
    return <img src={images} alt="img" />;
  }

  likeOrUnlike() {
    const { liked, listingId } = this.state;
    const { like, unlike } = this.props;
    if (liked) {
      this.setState({ liked: !liked });
      this.render();
      return unlike(listingId);
    }
    this.setState({ liked: !liked });
    this.render();
    return like(listingId);
  }

  fillOrUnfill() {
    const { liked } = this.state;
    if (liked) {
      return 'filledHeart';
    }
    return 'shadedHeart';
  }

  newOrNot() {
    const { isNewListing, forSaleByOwner } = this.state;
    if (isNewListing && !forSaleByOwner) {
      return (
        <span className="outerPropertyTagSpan">
          <span className="newSpan">NEW</span>
        </span>
      );
    }
    return null;
  }

  forSaleByOwnerOrNot() {
    const { forSaleByOwner } = this.state;
    if (forSaleByOwner) {
      return (
        <span className="outerPropertyTagSpan">
          <span className="forSaleByOwnerSpan">FOR SALE BY OWNER</span>
        </span>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="imagePanel">
        <div className="imagePanelBox">
          <div
            className="imagePanelContainer"
            // onClick={() => this.handleImageClick()}
            onMouseEnter={() => this.handleMouseHover()}
            onMouseLeave={() => this.handleMouseHover()}
          >
            <div>
              <picture>
                {this.zoomOnHover()}
              </picture>
            </div>
          </div>
          <div className="likeHomeContainer">
            <FontAwesomeIcon
              onClick={() => this.likeOrUnlike()}
              className={this.fillOrUnfill()}
              icon={faHeart}
            />
          </div>
          <div className="propertyTagsContainer">
            {this.newOrNot()}
            {this.forSaleByOwnerOrNot()}
          </div>
        </div>
      </div>
    );
  }
}

export default ImagePanel;
