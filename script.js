let songName = document.querySelector(".song-name");
let singerName = document.querySelector(".singer-name");
let playicon = document.querySelector("#play");
let currentTime = document.querySelector("#current-time");
let duration = document.querySelector("#duration");
let progress = document.querySelector("#progress");
let index = 0;
let playingSong = false;
let track = document.createElement("audio");

// Format time in minutes:seconds
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Update time display
function updateTime() {
    currentTime.textContent = formatTime(track.currentTime);
    duration.textContent = formatTime(track.duration);
    progress.value = (track.currentTime / track.duration) * 100;
}

// Initialize time tracking
track.addEventListener('timeupdate', updateTime);
track.addEventListener('loadedmetadata', () => {
    duration.textContent = formatTime(track.duration);
});

// Add progress bar seeking
progress.addEventListener('input', () => {
    const seekTime = (progress.value / 100) * track.duration;
    track.currentTime = seekTime;
});

// Add volume control
const volRange = document.querySelector('#vol-range');
volRange.addEventListener('input', () => {
    track.volume = volRange.value / 100;
});

let songs = [
    {
        name : "AAj ki raat",
        path :"AAj_ki_raat.mp3",
        singer : "Sachin-Jigar"
    },
    {
        name : "Dil Lauta Do _ Jubin Nautiyal_ Payal Dev",
        path : "dil_lauta_Do.mp3",
        singer : "Jubin Nautiyal_ Payal Dev",
    },
    {
        name : "Tute hai ishq mein hum par koi gham nahi",
        path :"Tute_hai_ishq_mein_hum_par.mp3",
        singer : "Jubin Nautiyal_ Payal Dev",
    },
    {
        name : "Sawan Aaya Hai Full Audio Song",
        path : "Sawan_Aaya_Hai.mp3",
        singer : " Arijit Singh",
    },
    {
        name : "BAARISH KE AANE SE",
        path :"Barrish_ke_aane_se.mp3",
        singer : "TONY KAKKAR",
    }
];

function loadTrack(index){
    track.src = songs[index].path;
    songName.innerHTML = songs[index].name;
    singerName.innerHTML = songs[index].singer;
}

loadTrack(index);

function playPause(){
    if(playingSong == false){
        playSong();
        playicon.classList.remove("fa-play");
        playicon.classList.add("fa-pause");
    }
    else{
        track.pause();
        playicon.classList.remove("fa-pause");
        playicon.classList.add("fa-play");
    }
    playingSong = !playingSong;
}

function playSong(){
    track.play();
}

function nextSong() {
    index = (index + 1) % songs.length;
    loadTrack(index);
    if (playingSong) {
        track.play();
    }
}

function prevSong() {
    index = (index - 1 + songs.length) % songs.length;
    loadTrack(index);
    if (playingSong) {
        track.play();
    }
}

// Sidebar functionality
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const songList = document.getElementById('song-list');

// Toggle sidebar
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    if (sidebar.classList.contains('show')) {
        sidebarToggle.classList.remove('fa-bars');
        sidebarToggle.classList.add('fa-xmark'); // Change to cut icon
        // const cutIcon = document.querySelector(".fa-xmark")
        // cutIcon.style.marginleft = "3rem";
    } else {
        sidebarToggle.classList.remove('fa-xmark');
        sidebarToggle.classList.add('fa-bars'); // Change back to bars icon
    }
});

// Populate song list
function populateSongList() {
    songs.forEach((song, idx) => {
        const li = document.createElement('li');
        li.textContent = `${song.name} - ${song.singer}`;
        li.addEventListener('click', () => {
            index = idx;
            loadTrack(index);
            playSong();
            sidebar.classList.remove('show'); // Close sidebar after selection
            sidebarToggle.classList.remove('fa-xmark');
            sidebarToggle.classList.add('fa-bars'); // Change back to bars icon
        });
        songList.appendChild(li);
    });
}

// Call function to populate song list on load  "C:\Users\bicky_z6v7mf\OneDrive\Documents\bittuNiwas.pdf"
populateSongList();
