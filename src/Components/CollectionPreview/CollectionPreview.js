import React from "react";
import ReactDOM from "react-dom";
import "./CollectionPreview.scss";
import CollectionItem from "../CollectionItem/CollectionItem";
import { connect } from "react-redux";
import { selectMovieItems } from "../../Redux/Movie/movie-selectors";
import { selectTVItems } from "../../Redux/TVShow/tv-selectors";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TitleHide } from "../../Utils/TitleHide";
import { LeftArrow, RightArrow } from "../../Utils/ScrollArrows";
import Fade from "react-reveal/Fade";

class CollectionPreview extends React.Component {
  constructor() {
    super();
    this.divRef = React.createRef();
  }

  componentDidMount() {
    var node = ReactDOM.findDOMNode(this);
    TitleHide(node);
  }

  onLeftClick = () => {
    LeftArrow(this.divRef);
  };

  onRightClick = () => {
    RightArrow(this.divRef);
  };

  render() {
    const {
      title,
      movieItems,
      tvItems,
      start,
      end,
      movies,
      tvshow
    } = this.props;
    const movieData = movieItems.slice(start, end);
    const tvData = tvItems.slice(start, end);
    return (
      <div className="collection-preview" id="scroll">
        <h1 className="title">{title.toUpperCase()}</h1>
        <Fade>
          <div className="collection-box">
            <span className="left-controls">
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="left-control-icon"
                onClick={this.onLeftClick}
              />
            </span>
            <span className="right-controls">
              <FontAwesomeIcon
                icon={faChevronRight}
                className="right-control-icon"
                onClick={this.onRightClick}
              />
            </span>
            <div className="preview" ref={this.divRef}>
              {movies
                ? movieData.map(item => (
                    <CollectionItem
                      key={item.id}
                      item={item}
                      movies={movies}
                      tvshow={tvshow}
                    />
                  ))
                : null}
              {tvshow
                ? tvData.map(item => (
                    <CollectionItem
                      key={item.id}
                      item={item}
                      movies={movies}
                      tvshow={tvshow}
                    />
                  ))
                : null}
            </div>
          </div>
        </Fade>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movieItems: selectMovieItems(state),
  tvItems: selectTVItems(state)
});

export default connect(mapStateToProps)(CollectionPreview);
