import React from 'react';
import { ajax } from 'jquery';
// eslint-disable-next-line import/extensions
import Carousel from './Carousel.jsx';
import CarouselStyleWrapper from './CarouselStyleWrapper.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    const { id } = props;
    this.state = {
      headline: 'Similar Homes You May Like',
      homeId: id,
      listings: [],
      city: null,
    };
    // this.getListings = this.getListings.bind(this);
  }

  componentDidMount() {
    this.getListings();
  }

  getListings() {
    const { homeId } = this.state;
    ajax({
      url: `/api/homes/similar/${homeId}`,
      method: 'GET',
      dataType: 'json',
      success: (response) => {
        this.setState({
          listings: response.rows,
          city: response.rows[0].city,
        });
        this.render();
      },
      error: console.log,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  likeListing(id) {
    ajax({
      url: `/api/listings/like/${id}`,
      method: 'PATCH',
      success: () => {
        //  ?
      },
      // eslint-disable-next-line no-console
      error: console.log,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  unlikeListing(id) {
    ajax({
      url: `/api/listings/unlike/${id}`,
      method: 'PATCH',
      success: () => {
        //  ?
      },
      // eslint-disable-next-line no-console
      error: console.log,
    });
  }

  render() {
    const { headline, listings, city } = this.state;
    return (
      <CarouselStyleWrapper>
        <div className="headline">{headline}</div>
        <Carousel
          city={city}
          like={this.likeListing}
          unlike={this.unlikeListing}
          listings={listings}
        />
      </CarouselStyleWrapper>
    );
  }
}

export default App;
