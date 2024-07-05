import {FaSearch} from 'react-icons/fa'

import RatingItems from '../RatingCard'
import CategoryItems from '../CategoryCard'

import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    getSearchFilter,
    categoryIdResponse,
    ratingIdResponse,
    allClearFilterActivate,
  } = props

  const onKeyDownFilter = event => {
    if (event.key === 'Enter') {
      getSearchFilter(event.target.value)
    }
    return null
  }

  const filteredCategoryId = categoryId => {
    categoryIdResponse(categoryId)
  }

  const getSelectedRating = ratingId => {
    ratingIdResponse(ratingId)
  }

  const onClearAllFilters = () => {
    allClearFilterActivate()
  }

  const onSearchBar = () => (
    <>
      <input
        type="search"
        className="filterSearch"
        onKeyDown={onKeyDownFilter}
      />
      <FaSearch className="filterSearchBar" />
    </>
  )
  return (
    <div className="filters-group-container">
      <div className="searchBarCard">{onSearchBar()}</div>
      <ul className="categoryUl">
        <h1 className="categoryHeading">Category</h1>
        {categoryOptions.map(eachObj => (
          <CategoryItems
            option={eachObj}
            key={eachObj.categoryId}
            filteredCategoryId={filteredCategoryId}
          />
        ))}
      </ul>
      <ul className="ratingUl">
        <h1 className="ratingHeading">Rating</h1>
        {ratingsList.map(eachObj => (
          <RatingItems
            rating={eachObj}
            key={eachObj.ratingId}
            getSelectedRating={getSelectedRating}
          />
        ))}
      </ul>
      <div className="button-card">
        <button
          type="button"
          className="clear-filter-button"
          onClick={onClearAllFilters}
        >
         Clear Filters
        </button>
      </div>
    </div>
  )
}

export default FiltersGroup
