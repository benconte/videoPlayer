let selector = document.getElementById("selector");
let slider = document.getElementById("slider");
let progress = document.getElementById("progress");
let video_slider = document.getElementById("video-slider");
let video_thumb = document.getElementById("video-thumb");
let video_progress = document.getElementById("video-progress");
let video = document.getElementById("video");
let fullscreen = document.getElementById("fullscreen");
let current_time = document.getElementById("current-time");
let videoDuration = document.getElementById("duration");
let video_loop = document.querySelector(".fa-retweet");

let is_playing = false;
let play = document.getElementById("play");
let pause = document.getElementById("pause");

if (is_playing) {
    pause.style.display = "block";

} else {
    play.style.display = "block";

}

// time function
// function convertHMS(value) {
//     const sec = parseInt(value, 10); // convert value to number if it's string
//     let hours = Math.floor(sec / 3600); // get hours
//     let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
//     let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
//     // add 0 if value < 10; Example: 2 => 02
//     if (hours < 10) { hours = "0" + hours; }
//     if (minutes < 10) { minutes = "0" + minutes; }
//     if (seconds < 10) { seconds = "0" + seconds; }
//     // return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
//     return minutes + ':' + seconds;
// }


// handling play/pause
pause.onclick = function() {
    is_playing = false;
    video.pause();
    pause.style.display = "none";
    play.style.display = "block";
}

play.onclick = function() {
    is_playing = true;
    video.play();
    pause.style.display = "block";
    play.style.display = "none";
}

video_loop.onclick = () => {
    if (video.loop) {
        video.loop = false;
        video_loop.classList.toggle("active");
    } else {
        video.loop = true;
        video_loop.classList.toggle("active");
    }


}


video.onloadeddata = () => {
    video_slider.max = video.duration;
    var vs = parseInt(video.duration % 60) //video seconds
    var vm = parseInt((video.duration / 60) % 60) //video minutes
    console.log(vm + ':' + vs)
    videoDuration.textContent = vm + ':' + vs;
}

slider.oninput = function() {
    video.volume = slider.value / 100;
    progress.style.width = (video.volume * 100) + "%";
    selector.style.left = (video.volume * 100) + "%";
    // console.log(video.volume * 100)

}

let mute_icon = document.querySelector(".fa-volume-mute");
let muted = false;

mute_icon.onclick = () => {
    if (muted) {
        video.muted = false;
        muted = false;
        mute_icon.classList.toggle("active");

    } else {
        video.muted = true;
        muted = true;
        mute_icon.classList.toggle("active");
    }
}

// end of volume

// creating video
video.ontimeupdate = () => {
    video_slider.value = video.currentTime % video.duration;
    video_progress.style.width = parseFloat((video.currentTime / video.duration) * 100) + "%";
    video_thumb.style.left = parseFloat((video.currentTime / video.duration) * 100) + "%";

    // video_progress.style.width = parseInt(video.currentTime) / 100 + "%";
    // video_thumb.style.left = parseInt(video.currentTime) / 100 + "%";
    var cs = parseInt(video.currentTime % 60)
    var cm = parseInt((video.currentTime / 60) % 60)
    current_time.textContent = cm + ':' + cs;
}

video_slider.oninput = function() {
    video_slider.value = this.value;
    video.currentTime = this.value;
    video_progress.style.width = parseFloat((video.currentTime / video.duration) * 100) + "%";
    video_thumb.style.left = parseFloat((video.currentTime / video.duration) * 100) + "%";
}

video.addEventListener("ended", function() {
    pause.style.display = "none";
    play.style.display = "block";

}, false)


fullscreen.onclick = function() {
    // toggle between full-screen and normal-screen mode
    if (video.requestFullscreen) {
        video.requestFullscreen()
    } else if (video.webkitRequestFullScreen) { // for safari
        video.webkitRequestFullScreen()
    } else if (video.mozRequestFullScreen) { // for mozilla
        video.mozRequestFullScreen()
    } else if (video.msRequestFullscreen) { // for IE11
        video.msRequestFullscreen()
    }
}



// /* Close fullscreen */
// function closeFullscreen() {
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     } else if (document.webkitExitFullscreen) { /* Safari */
//       document.webkitExitFullscreen();
//     } else if (document.msExitFullscreen) { /* IE11 */
//       document.msExitFullscreen();
//     }
//   }
