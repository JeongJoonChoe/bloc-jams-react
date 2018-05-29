import React from 'react';
import './Pages.css';

const Landing = () => (
	<div className="container mt-5">
		<section className="landing row shadow">
			<section className="selling-points col">
				<div className="point">
					<h2 className="point-title">Choose your music</h2>
					<p className="point-description">The world is full of music;  why should you have to listen to music that someone else chose?</p>
	      		</div>
	      		<div className="point">
	        		<h2 className="point-title">Unlimited, streaming, ad-free</h2>
	        		<p className="point-description">No arbitrary limits. No distractions.</p>
	      		</div>
	      		<div className="point">
	        		<h2 className="point-title">Mobile enabled</h2>
	        		<p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
				</div>
			</section>
			<section className="album-covers col">
				<img className="img-fluid img-size rounded" src="https://www.beatlesbible.com/wp/media/abbey_road.jpg" alt="The Beatles album cover"/>
				<img className="img-fluid img-size rounded" src="https://rogerowengreen.files.wordpress.com/2017/05/hard-days-night.jpg" alt="The Beatles album cover"/>
				<img className="img-fluid img-size rounded" src="https://i.pinimg.com/originals/29/16/31/291631120bf9e51607ccf06d541d35a3.jpg" alt="Twice Signal album cover"/>
				<img className="img-fluid img-size rounded" src="https://ih1.redbubble.net/image.544164177.2679/flat,800x800,070,f.u1.jpg" alt="Twice What is Love album cover"/>
			</section>
		</section>
	</div>
)


export default Landing;
