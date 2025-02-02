import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const initialProductsFetchStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    fetchStatus: initialProductsFetchStatus.initial,
    activeOptionId: sortbyOptions[0].optionId,
    searchInput: '',
    selectedCategory: '',
    selectedRating: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      fetchStatus: initialProductsFetchStatus.progress,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {
      activeOptionId,
      searchInput,
      selectedCategory,
      selectedRating,
    } = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&title_search=${searchInput}&category=${selectedCategory}&rating=${selectedRating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        fetchStatus: initialProductsFetchStatus.success,
      })
    } else {
      this.setState({fetchStatus: initialProductsFetchStatus.failure})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  getSearchFilter = input => {
    this.setState({searchInput: input}, this.getProducts)
  }

  categoryIdResponse = categoryId => {
    this.setState({selectedCategory: categoryId}, this.getProducts)
  }

  ratingIdResponse = ratingId => {
    this.setState({selectedRating: ratingId}, this.getProducts)
  }

  allClearFilterActivate = () => {
    this.setState(
      {searchInput: '', selectedCategory: '', selectedRating: ''},
      this.getProducts,
    )
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state
    const productFailureView = productsList.length === 0
    return productFailureView ? (
      <div className="products-failure-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          alt="no products"
        />
      </div>
    ) : (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
      />
      <h1>Oops! Something went Wrong</h1>
      <p>
        We are having some trouble processing your request <br /> Please try
        again
      </p>
    </div>
  )

  selectingRenderToDisplay = () => {
    const {fetchStatus} = this.state
    switch (fetchStatus) {
      case initialProductsFetchStatus.success:
        return this.renderProductsList()
      case initialProductsFetchStatus.progress:
        return this.renderLoader()
      case initialProductsFetchStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          getSearchFilter={this.getSearchFilter}
          categoryIdResponse={this.categoryIdResponse}
          ratingIdResponse={this.ratingIdResponse}
          allClearFilterActivate={this.allClearFilterActivate}
        />

        {this.selectingRenderToDisplay()}
      </div>
    )
  }
}

export default AllProductsSection
