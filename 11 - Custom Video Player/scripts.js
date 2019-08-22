class videoPlayer {
	constructor () {
		this.video = document.querySelector('.player__video');
		this.controlls = new function() {
			const c = this;
			c.all = document.querySelector('.player__controls');
			c.progress = c.all.querySelector('.progress');
			c.progressFilled = c.progress.querySelector('.progress__filled');
			c.playerToggle = c.all.querySelector('.player__button.toggle');
			c.fullscreen = c.all.querySelector('.player__fullscreen');
			c.sliders = c.all.querySelectorAll('.player__slider');
			c.skipButtons = c.all.querySelectorAll('[data-skip]');
		}

		this.handler = {
			updatePlayButton : this.updatePlayButton.bind(this),
			progress : this.progress.bind(this),
			scrub : this.scrub.bind(this),
			playerToggle : this.playPause.bind(this),
			fullscreen : this.fullscreen.bind(this),
			slider : this.slider.bind(this),
			skip: this.skip.bind(this)
		}

		this.mousedown = false;

		this.bindEvents();

	}

	bindEvents() {
		document.addEventListener('mousedown', () => this.mousedown = true );
		document.addEventListener('mouseup', () => this.mousedown = false );
		this.video.addEventListener('play', this.handler.updatePlayButton );
		this.video.addEventListener('pause', this.handler.updatePlayButton );
		this.video.addEventListener('timeupdate', this.handler.progress );
		this.controlls.progress.addEventListener('mousemove', this.handler.scrub );
		this.controlls.progress.addEventListener('click', this.handler.scrub );
		this.controlls.playerToggle.addEventListener('click', this.handler.playerToggle );
		this.controlls.fullscreen.addEventListener('click', this.handler.fullscreen );
		this.controlls.sliders.forEach( el => el.addEventListener('input', this.handler.slider ));
		this.controlls.skipButtons.forEach( el => el.addEventListener('click', this.handler.skip ));

	}

	unBindEvents() {
		document.removeEventListener('mousedown', () => this.mousedown = true );
		document.removeEventListener('mouseup', () => this.mousedown = false );
		this.video.removeEventListener('play', this.handler.updatePlayButton );
		this.video.removeEventListener('pause', this.handler.updatePlayButton );
		this.video.removeEventListener('timeupdate', this.handler.progress );
		this.controlls.progress.removeEventListener('mousemove', this.handler.scrub );
		this.controlls.progress.removeEventListener('click', this.handler.scrub );
		this.controlls.playerToggle.removeEventListener('click', this.handler.playerToggle );
		this.controlls.fullscreen.removeEventListener('click', this.handler.fullscreen );
		this.controlls.sliders.forEach( el => el.removeEventListener('input', this.handler.slider ));
		this.controlls.skipButtons.forEach( el => el.removeEventListener('click', this.handler.skip ));
	}

	progress() {
		const size = parseInt( (this.video.currentTime / this.video.duration ) *100 );
		this.controlls.progressFilled.style.flexBasis = `${size}%`;
	}

	scrub(e) {
		const requested = (e.offsetX / e.currentTarget.offsetWidth) *100,
			time = (this.video.duration * requested) /100;
			if( this.mousedown || e.type === 'click' ) {
				this.video.currentTime = time;
			}
	}

	updatePlayButton() {
		const icon = this.video.paused ?  '►' : '❚ ❚';
		this.controlls.playerToggle.textContent = icon;
	}

	playPause (e) {
		const el = e.currentTarget;
		if (this.video.paused == true) {
			this.video.play()
		} else {
			this.video.pause();
		}
	}

	fullscreen(e) {
		this.video.requestFullscreen();
	}

	slider (e) {
		const el = e.currentTarget;
		this.video[el.name] = el.value;
	}

	skip(e) {
		const el = e.currentTarget;
		this.video.currentTime += parseFloat(el.dataset.skip);
	}

}

vp = new videoPlayer();
