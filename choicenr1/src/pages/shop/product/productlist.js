import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FilterProduct } from '../../../services';
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import Sidebar from '../../../widgets/shop/sidebar';
import Listview from '../../../widgets/shop/listview';
import Pageheading from '../../../widgets/Pageheading';

const ProductParPage = 4;
class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      minValue: 0,
      maxValue: 4,
      status: true,
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  handleChange = value => {

    this.setState({
      minValue: (value - 1) * ProductParPage,
      maxValue: value * ProductParPage
    });
  };
  itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return <Link className="page-link" to="/">Previous</Link>;
    }
    if (type === 'next') {
      return <Link className="page-link" to="/">Next</Link>;
    }
    return originalElement;
  }
  render() {
    let { products } = this.props;
    let { status } = this.state;
    return (
      <div>
        {/*hero section start*/}
        <section className="position-relative">
          <Pageheading foldername={"Shop"} title={"Product List"} />
        </section>
        {/*hero section end*/}
        {/*body content start*/}
        {status ?
          <div className="page-content">
            <section>
              <div className="container">
                <div className="row">
                  {(products.length > 0) ?
                    <div className="col-lg-9 col-md-12 order-lg-12">

                      {products.slice(this.state.minValue, this.state.maxValue).map((product, index) => (
                        <Listview productdata={product} key={index} />
                      ))}
                      <div className="text-center col-12">
                        <Pagination
                          defaultCurrent={1}
                          defaultPageSize={ProductParPage}
                          onChange={this.handleChange}
                          total={products.length}
                          itemRender={this.itemRender}
                        />
                      </div>
                    </div>
                    :
                    <div className="col-lg-9 col-md-12 order-lg-12">
                      <div className="row text-center12">
                        <h3>Sorry! No products were found matching your selection!    </h3>
                        <p>Please try to other words.</p>
                      </div>
                    </div>
                  }
                  <Sidebar />
                </div>
              </div>
            </section>
          </div>
          : <div>Loading</div>
        }
      </div>
    );
  }
}
const ProductDispatchToProps = (state) => ({
  products: FilterProduct(state.data, state.filters)

})
export default connect(
  ProductDispatchToProps, {}
)(ProductList);