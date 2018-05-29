import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import albumData from './../data/albums';
import './Pages.css';

class Library extends Component {
	constructor(props) {
		super(props);
		this.state = { albums: albumData };
	}

	render() {
		return (
			<div className="container">
				<section className="landing">
					<div id="albumCarousel" className="carousel slide shadow-lg" data-ride="carousel">
						<div className="carousel-inner">
						{ 
							this.state.albums.map( (album, index) => 
								<div className={ index === 0 ? "carousel-item active" : "carousel-item"}>
									<Link to={`/album/${album.slug}`} key={index}>
										<img className="d-block w-100 rounded" height="500" src={album.albumCover} alt={album.title} />
										<div className="carousel-caption">
											<h3>{album.title}</h3>
											<h4>{album.artist}</h4>
											<h4>{album.songs.length} songs</h4>
										</div>
									</Link>
								</div>
							)
						}
						</div>
						<a className="carousel-control-prev" href="#albumCarousel" role="button" data-slide="prev">
						    <span className="carousel-control-prev-icon"></span>
						    <span className="sr-only">Previous</span>
						</a>
						<a className="carousel-control-next" href="#albumCarousel" role="button" data-slide="next">
						    <span className="carousel-control-next-icon"></span>
						    <span className="sr-only">Next</span>
						</a>
					</div>
				</section>
			</div>
		);
	}
}

export default Library;