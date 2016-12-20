/* Elements */
const player = document.querySelector(".player");
const video = player.querySelector('.viewer');
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const ranges = player.querySelectorAll(".player__slider");
const skipButtons = player.querySelectorAll('[data-skip]');
const toggle = player.querySelector('.toggle');

/* Functions */
function togglePlay(){
    // if(video.pause){
    //     video.play();
    // }
    // video.pause();
    console.log('togglePlayCalled');
    const doIt = video.paused ? 'play' : 'pause';
    video[doIt]();
}

function updateButton(){
    const icon = this.paused ? '►' : '❚❚';
    toggle.textContent = icon;
}

function handleSkip(){
    console.log("Skip called");
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRanges(){
    if(this.name === 'volume'){
        //handle volume
        console.log('hit the volume button');
        video.volume = parseFloat(this.value);
    }
    else {
        //Handle the playback speed.
        video.playbackRate = parseFloat(this.value);
    }
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
    //console.log("updateProgress called");
}

function scrub(e){
    const scrubTime = (e.offsetX/ progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    //console.log(e);

}

/* Listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => 
    button.addEventListener('click', handleSkip));

ranges.forEach(range => 
    range.addEventListener('change', handleRanges));
ranges.forEach(range => 
    range.addEventListener('mousemove', handleRanges));
video.addEventListener('timeupdate', handleProgress);

let mousedn = false;
progress.addEventListener('click' , scrub);
progress.addEventListener('mousemove' , (e) => mousedn && scrub(e));
progress.addEventListener('mousedown', () => mousedn = true)
progress.addEventListener('mouseup', () => mousedn = false)