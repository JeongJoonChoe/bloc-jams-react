import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
	constructor(props) {
		super(props);

		const album = albumData.find( album => {
			return album.slug === this.props.match.params.slug
		});

		this.state = {
			album: album,
			currentSong: album.songs[0],
       	  	currentTime: 0,
       	  	currentVolume: 1,
       		duration: album.songs[0].duration,
			currentHover: '',
      		isPlaying: false,
      		isHovering: false
		}

		this.audioElement = document.createElement('audio');
		this.audioElement.src = album.songs[0].audioSrc;
		this.audioElement.volume = this.state.currentVolume;
	}

	componentDidMount() {
    	this.eventListeners = {
        	timeupdate: e => {
        		this.setState({ currentTime: this.audioElement.currentTime });
       		},
       		durationchange: e => {
         		this.setState({ duration: this.audioElement.duration });
        	},
        	volumeupdate: e => {
        		this.setState({ currentVolume: this.audioElement.currentVolume });
        	}
     	};
     	this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
     	this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    	this.audioElement.addEventListener('volumeupdate', this.eventListeners.volumeupdate);
    }

   	componentWillUnmount() {
     	this.audioElement.src = null;
     	this.audioElement.volume = null;
     	this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     	this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
   		this.audioElement.removeEventListener('volumeupdate', this.eventListeners.volumeupdate);
   	}

	play() {
		this.audioElement.play();
		this.setState({  isPlaying: true });
	}

	pause() {
		this.audioElement.pause();
		this.setState({ isPlaying: false });
	}

	setSong(song) {
    	this.audioElement.src = song.audioSrc;
    	this.setState({ currentSong: song });		
	}

	formatTime(time) {
		if (typeof time !== "number" ) { return "-:--"; }
		var minutes = Math.floor(time / 60);
		var seconds = Math.floor(time % 60);

		if (seconds < 10) { seconds = "0" + seconds;}
		return minutes + ":" + seconds;
	}

	handleSongClick(song) {
		const isSameSong = this.state.currentSong === song;
		if (this.state.isPlaying && isSameSong) {
    		this.pause();
 		} else {
 			if (!isSameSong) { this.setSong(song); } 
   			this.play();
 		}
	}

	handlePrevClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
    }

    handleNextClick(){
    	const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    	const newIndex = Math.min(currentIndex + 1, this.state.album.songs.length - 1);
    	const newSong = this.state.album.songs[newIndex];
    	this.setSong(newSong);
    	this.play();
    }

    handleTimeChange(e) {
    	const newTime = this.audioElement.duration * e.target.value;
    	this.audioElement.currentTime = newTime;
    	this.setState({ currentTime: newTime });
    }

    handleVolumeChange(e){
   		const newVolume = e.target.value;
   		this.audioElement.volume = newVolume;
   		this.setState({ currentVolume: newVolume })
    }

	hoverChange(x) {
		this.setState({ isHovering: x });
	}

	setCurrentHover(song){
		this.setState({ currentHover: song });
	}

	handleSongHover(song) {
		this.setCurrentHover(song);
		this.hoverChange(true);
	}

	handleSongLeave(song) {
		this.setCurrentHover('');
		this.hoverChange(false);
	}

	render() {
		return (
			<section className="album">
	       		<section id="album-info">
           			<img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
	           		<div className="album-details">
	             		<h1 id="album-title">{this.state.album.title}</h1>
	             		<h2 className="artist">{this.state.album.artist}</h2>
	             		<div id="release-info">{this.state.album.releaseInfo}</div>
	           		</div>
	         	</section> 
		        <table id="song-list">
		         	<PlayerBar
		           		isPlaying={this.state.isPlaying}
		           		currentSong={this.state.currentSong}
		           		currentTime={this.audioElement.currentTime}
            			duration={this.audioElement.duration}
            			currentVolume={this.state.currentVolume}
		           		handleSongClick={() => this.handleSongClick(this.state.currentSong)}
           	            handlePrevClick={() => this.handlePrevClick()}
           	            handleNextClick={() => this.handleNextClick()}
           	            handleTimeChange={(e) => this.handleTimeChange(e)}
           	            handleVolumeChange={(e) => this.handleVolumeChange(e)}
           	            formatTime={(t) => this.formatTime(t)} 
		         	/>
		        	<colgroup>
		            	<col id="song-number-column" />
		            	<col id="song-title-column" />
		            	<col id="song-duration-column" />
		            </colgroup>  
		            <tbody>
		            	<tr>
		            		<th>Song Number</th>
		            		<th>Song Title</th>
		            		<th>Song Duration</th>
		            	</tr>
						{ this.state.album.songs.map( (song, index) =>
							<tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.handleSongHover(song)} onMouseLeave={() => this.handleSongLeave(song)}>
								<td>{ this.state.currentHover === song && !this.state.isPlaying ?  <span className="ion-play"></span> : this.state.currentHover === song && this.state.currentHover === this.state.currentSong ? <span className="ion-pause"></span> : this.state.currentHover === song && this.state.currentHover !== this.state.currentSong ? <span className="ion-play"></span> : index + 1 }</td>
								<td>{song.title}</td>
								<td>{song.duration}</td>
							</tr>
						)}
		           </tbody>
		        </table>		   	
		   	</section>   
	 	);
	}
}

export default Album;
