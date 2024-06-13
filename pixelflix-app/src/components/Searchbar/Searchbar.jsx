import './Searchbar.scss'

import searchIcon from "../../assets/icons/icon-search.svg"

function Searchbar({placeholder_text}) {

  return (
    <section className='searchbar'>
      <div className="searchbar__imgcontainer">
        <img className='searchbar__icon' src={searchIcon}/>
      </div>
      <textarea placeholder={`Search for ${placeholder_text}`}></textarea>
    </section>
  )
}

export default Searchbar