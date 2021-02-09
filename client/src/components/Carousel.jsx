import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
// eslint-disable-next-line import/extensions
import Listing from './Listing.jsx';
// eslint-disable-next-line import/extensions
import ListingsEnd from './ListingsEnd.jsx';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0,
    };
    this.nextButtonClick = this.nextButtonClick.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.stopCarouselFromGoingOver = this.stopCarouselFromGoingOver.bind(this);
  }

  nextButtonClick(view) {
    this.setState({ view: (view + 1) });
  }

  previousButtonClick(view) {
    this.setState({ view: (view - 1) });
  }

  previousButtonOrNot(view) {
    if (view > 0) {
      return (
        <div className="previousButtonContainer">
          <button
            className="carouselButtons"
            type="button"
            onClick={() => this.previousButtonClick(view)}
          >
            <div className="buttonIcon">
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
          </button>
        </div>
      );
    }
    return null;
  }

  nextButtonOrNot(view) {
    if (view < 4) {
      return (
        <div className="nextButtonContainer">
          <button
            className="carouselButtons"
            type="button"
            onClick={() => this.nextButtonClick(view)}
          >
            <div className="buttonIcon">
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </button>
        </div>
      );
    }
    return null;
  }

  stopCarouselFromGoingOver(numberOfListings) {
    const { view } = this.state;
    if (view > (Math.floor((numberOfListings + 1) / 4.063))) {
      return (((numberOfListings + 1) - 4.063) * 240) / 912;
    } if (view < 0) {
      return 0;
    }
    return view;
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { listings, like, unlike, city } = this.props;
    const { view } = this.state;
    const translateView = {
      transform: `translateX(-${(this.stopCarouselFromGoingOver(listings.length)) * 912}px)`,
    };

    return (
      <div className="carousel">
        <div className="carouselContainer">
          <div className="carouselWindow">
            <ul className="carouselList" style={translateView}>
              {
                listings.map((listing) => (
                  <Listing
                    listing={listing}
                    like={like}
                    unlike={unlike}
                    key={listing._id}
                  />
                ))
              }
              <ListingsEnd city={city} />
            </ul>
            {this.previousButtonOrNot(view)}
            {this.nextButtonOrNot(view)}
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
