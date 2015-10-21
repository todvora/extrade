import React from 'react';
import '../styles/main.less';
//import imgHello from './hello.gif';
//import imgIcon from './icon.png';
import $ from 'jquery';
import Product from '../components/Product';
import ProductNavigation from '../components/ProductNavigation';
import querystring from 'querystring';

import ProductPromise from '../utils/DataPromiseUtils';
import DateUtils from '../utils/DateUtils';
import Q from 'q';
import update from 'react-addons-update';

export default class Stats extends React.Component {

 constructor() {
    super();
    this.state = {
      products:[],
      progressMessage:'načítám...',
      progressPercents:0,
      progressFinished:false
    };
  }

 componentDidMount() {

   const criteria = {
     intervals: DateUtils.parseIntervals(this.props.location.query.interval),
     products: this.props.location.query.product,
     countries: this.props.location.query.country || []
   }

   var self = this;

   const progressCallback = (criteria, partialResult, totalCount, finishedCount) => {

    const progressPercents = Math.floor((100 / totalCount) * finishedCount);
    this.setState(update(this.state, {
      progressMessage:{$set: `${progressPercents}%`},
      progressPercents:{$set: progressPercents},
      progressFinished:{$set: totalCount==finishedCount}
    }));
   }

   const ajaxCall = criteria => Q($.get('/api/data?' + querystring.stringify(criteria)));

   ProductPromise
    .loadData(criteria, ajaxCall, progressCallback)
    .then(result => self.setState({products: result}))
    .fail(ex => console.log(ex))
    .done();
  }

  render() {
    return (
      <div>
        {!this.state.progressFinished &&
          <div>
            <p>Probíhá načítání dat z webu Českého statistického úřadu. Chvíli to potrvá.</p>
            <div className="progress">
              <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{width: this.state.progressPercents + '%', minWidth: '5em'}}>
                {this.state.progressMessage}
              </div>
            </div>
          </div>
        }

        <ProductNavigation products={this.state.products} />
        <div className="products">
          {this.state.products.map(product => {
            return <Product product={product}/>
          })}

        </div>
      </div>
    );
  }
}

