import './index.css'

const RatingItems = props => {
  const {rating, getSelectedRating} = props
  const {imageUrl, ratingId} = rating
  const onSelectRating = () => {
    getSelectedRating(ratingId)
  }
  return (
    <li>
      <button type="button" onClick={onSelectRating}>
        <img src={imageUrl} alt={`rating ${ratingId}`} /> <span>& up</span>
      </button>
    </li>
  )
}

export default RatingItems
