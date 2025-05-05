class Song {
  constructor(song, title, cover) {
    this.song = song;
    this.title = title;
    this.cover = cover;
  }
}

class MusicPlayer {
  constructor(song) {
    this.song = song;
    this.audio = document.getElementById("audio");
    this.songList = document.querySelector(".song_list");
    this.musicCover = document.querySelector(".music_image");
    this.previousBtn = document.querySelector(".previous");
    this.start = document.querySelector(".play");
    this.nextBtn = document.querySelector(".next");
    this.title = document.querySelector(".title");
    this.progressBar = document.getElementById("progress");
    this.li = document.getElementsByTagName("li");
    this.index = 0;
    this.istrue = true;
    //event
    this.display();
    this.musicDisplay(this.song[this.index]);
    this.start.addEventListener("click", () => {
      this.Toggle();
    });
    this.previousBtn.addEventListener("click", () => {
      if (this.index === 0) this.index = this.song.length - 1;
      else this.index--;
      this.musicDisplay(this.song[this.index]);
      this.musicPlay();
    });
    this.nextBtn.addEventListener("click", () => {
      if (this.index === this.song.length - 1) this.index = 0;
      else this.index++;
      this.musicDisplay(this.song[this.index]);
      this.musicPlay();
    });
    this.audio.addEventListener("timeupdate", () => {
      let currenttime = this.audio.currentTime;
      let songduration = this.audio.duration;
      this.progressBar.value = (currenttime / songduration) * 100;
    });
    this.progressBar.addEventListener("input", () => {
      this.Drag();
    });
  }
  display() {
    this.song.forEach((e, index) => {
      let li = document.createElement("li");
      li.textContent = e.title;
      this.songList.appendChild(li);
      li.addEventListener("click", () => {
        for (var el of this.li) {
          el.classList.remove("active");
        }
        li.classList.add("active");

        this.index = index;
        this.musicDisplay(e);
        this.musicPlay();
      });
    });
  }
  musicDisplay(info) {
    this.title.textContent = info.title;
    this.audio.setAttribute("src", info.song);
    this.musicCover.setAttribute("src", info.cover);
  }
  musicPlay() {
    this.audio.play();
    this.start.innerHTML = `<i class="ri-pause-line"></i>`;
    this.istrue = false;
  }
  musicPause() {
    this.audio.pause();
    this.start.innerHTML = `<i class="ri-play-fill"></i>`;
    this.istrue = true;
  }
  Toggle() {
    this.istrue ? this.musicPlay() : this.musicPause();
  }
  Drag() {
    this.audio.currentTime =
      (this.progressBar.value / 100) * this.audio.duration;
  }
}

const song = [
  new Song(
    "asset/AP Dhillon ft. Ayra Starr - Bora Bora (Official Music Video) ft. Ayra Starr.mp3",
    "AP Dhillon ft. Ayra Starr - Bora Bora (Official Music Video) ft. Ayra Starr",
    "https://upload.wikimedia.org/wikipedia/commons/9/95/AP_Dhillon_CA.jpg"
  ),
  new Song(
    "asset/SOFTLY (Official Music Video) KARAN AUJLA _ IKKY _ LATEST PUNJABI SONGS 2023.mp3",
    "SOFTLY (Official Music Video) KARAN AUJLA _ IKKY _ LATEST PUNJABI SONGS 2023",
    "https://timesofindia.indiatimes.com/photo/msid-104656208/104656208.jpg?resizemode=4"
  ),
  new Song(
    "asset/WAVY (OFFICIAL VIDEO) KARAN AUJLA _ LATEST PUNJABI SONGS 2024.mp3",
    "WAVY (OFFICIAL VIDEO) KARAN AUJLA _ LATEST PUNJABI SONGS 2024",
    "https://i0.wp.com/lyricskikitab.com/wp-content/uploads/2024/11/wavy-karan-aujla-lyrics-english-translation.jpg?fit=1280%2C720&ssl=1"
  ),
  new Song(
    "asset/With You - AP Dhillon (Official Music Video).mp3",
    "With You - AP Dhillon (Official Music Video)",
    "https://images.news18.com/ibnlive/uploads/2023/08/ap-dillon-banita-sandhuwith-you-song.jpg.png"
  ),
];

const Music = new MusicPlayer(song);
// console.log(Music);
