import './index.css'

const CategoryItems = props => {
  const {option, filteredCategoryId} = props
  const {name, categoryId} = option
  const onFindCategory = () => {
    filteredCategoryId(categoryId)
  }
  return (
    <li>
      <button type="button" onClick={onFindCategory}>
        <p>{name}</p>
      </button>
    </li>
  )
}

export default CategoryItems
