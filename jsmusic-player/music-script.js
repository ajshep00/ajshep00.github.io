//Defines the variables associated with the proper ID's for clearer reading
var player = document.getElementById("player");
var plause = document.getElementById("plause");
var playlist = document.getElementById("playlist");
var albumArtPicture = document.getElementById("albumArtPicture");

let songs = [];
    songs[0] = {source: "../audio/cold_turkey.mp3", title: "Cold Turkey", artist: "The Happy Fits", art: "../album_art/under_the_shade.jpg"};
    songs[1] = {source: "../audio/miss_atomic_bomb.mp3", title: "Miss Atomic Bomb", artist: "The Killers", art: "../album_art/miss_atomic_bomb.png"};
    songs[2] = {source: "../audio/christmas_kids.mp3", title: "Christmas Kids", artist: "Roar", art: "../album_art/christmas_kids.jpg"};
    songs[3] = {source: "../audio/blunders.mp3", title: "Blunders", artist: "The Polar Boys", art: "../album_art/blunders.jpg"};
    songs[4] = {source: "../audio/18.mp3", title: "18", artist: "Anarbor", art: "../album_art/18.jpg"};
    songs[5] = {source: "../audio/october.mp3", title: "we fell in love in october", artist: "girl in red", art: "../album_art/october.jpg"};
    songs[6] = {source: "../audio/no_money.mp3", title: "No Money No Honey", artist: "FIDLAR", art: "../album_art/no_money.jpg"};
    songs[7] = {source: "../audio/like.mp3", title: "Like Or Like Like", artist: "Miniature Tigers", art: "../album_art/like.jpg"};
    songs[8] = {source: "../audio/chicago.mp3", title: "The Night Chicago Died", artist: "Paper Lace", art: "../album_art/chicago.jpg"};
    songs[9] = {source: "../audio/touch_tank.mp3", title: "touch tank", artist: "Quinnie", art: "../album_art/touch_tank.jpg"};
    songs[10] = {source: "../audio/my_type.mp3", title: "My Type", artist: "Saint Motel", art: "../album_art/my_type.jpg"};
    songs[11] = {source: "../audio/64.mp3", title: "When I'm Sixty Four", artist: "The Beatles", art: "../album_art/64.jpg"};
    songs[12] = {source: "../audio/23.mp3", title: "23", artist: "Wallice", art: "../album_art/23.jpg"};
    songs[13] = {source: "../audio/rain.mp3", title: "I Think I Like When It Rains", artist: "Willis", art: "../album_art/rain.jpg"};
    songs[14] = {source: "../audio/dream.mp3", title: "Life's A Dream", artist: "The Polar Boys", art: "../album_art/dream.jpg"};


    //Assigns "variables" that cannot be reassigned for the generative song list
    const list = playlist;
    let html = "";

    //Loop that runs through the array of songs (Except the first one as that one has to have the selected class to begin with,
    //then generates html list items with buttons using the proper data contained within the array.
    for (let i = 1; i < songs.length; i++) {
      var title = songs[i].title;
      title = JSON.stringify(title).slice(1,-1);
      var artist = songs[i].artist;
      artist = JSON.stringify(artist).slice(1, -1);
      html += "<li><button id=\"song" + i + "\"" + " onclick=\"musicChoice(" + i + ", this)\">" + title + " - " + artist + "</button ></li>";
    }
    playlist.insertAdjacentHTML("beforeend", html);

    //Calls the "nowPlaying" function in order to display the default selected song upon webpage load
    nowPlaying();

    


    /* Function Definitions
    * Including:
    *  Play/Pause
    *  Music Choice
    *  Play Next
    *  Play Previous
    *  Now Playing
    *  Album Art
    */

    // Pauses & Plays the music, while also changing the icon for the play/pause button
    function stop() {
      if (plause.innerHTML == "play_arrow") {
        plause.innerHTML = "pause";
        player.play();
      }
      else {
        plause.innerHTML = "play_arrow";
        player.pause();
      }
      nowPlaying()
    }

    
    //Changes the selected class to the item that is clicked and plays it
    function musicChoice(id, clickedElement) {
      player.src = songs[id].source;
      player.play();
      plause.innerHTML = "pause";

      var selected = playlist.querySelector(".selected");
      selected.classList.remove("selected");
      clickedElement.classList.add("selected");

      nowPlaying();
      albumArt();
    }

    //Plays the next song when the "play next" icon is clicked
    function playNext() {
      //Gets the currently selected song, makes it a number, and creates a new variable for the number of the next song
      var selected = playlist.querySelector(".selected");
      current = selected.getAttribute("id").slice(4);
      current = Number(current);
      nextSong = (current+1);

      //Determines if the current song is the last one in the queue and if it is, returns to the beginning of the playlist
      if (current == (songs.length - 1)) {
        player.src = songs[0].source;
        player.play()

        //Removes the selected attribute from the current song and adds it to the first one
        selected.classList.remove("selected");
        document.getElementById("song0").classList.add("selected");
      }
      else {
        //Gets the source attribute of the next song & plays it
        player.src = songs[nextSong].source;
        player.play()

        //Changes the selected song to the next one
        selected.classList.remove("selected");
        next = document.getElementById("song"+nextSong.toString());
        next.classList.add("selected");
      }
      plause.innerHTML = "pause";

      //Calls "nowPlaying" in order to change the displayed track information
      nowPlaying();
      albumArt();
    }

    //Plays the previous track from the playlist
    function playPrevious() {
      //Gets the currently selected song, makes it a number, and creates a new variable for the number of the previous song
      var selected = playlist.querySelector(".selected");
      current = selected.getAttribute("id").slice(4);
      current = Number(current);
      lastSong = (current-1);

      //Gets the source attribute of the previous song and plays it
      player.src = songs[lastSong].source;
      player.play();

      plause.innerHTML = "pause";

      //Changes the selected song to the previous one
      selected.classList.remove("selected");
      next = document.getElementById("song"+lastSong.toString());
      next.classList.add("selected");

      nowPlaying();
      albumArt();
    }

    //Changes the Title and Artist Elements in order to reflect the currently playing song
    function nowPlaying() {
      var nowPlayingTitle = document.getElementById("nowPlayingTitle");
      var nowPlayingArtist = document.getElementById("nowPlayingArtist");
      var selected = playlist.querySelector(".selected");
      current = selected.getAttribute("id").slice(4);
      current = Number(current);
      
      nowPlayingTitle.innerHTML = songs[current].title;
      nowPlayingArtist.innerHTML = songs[current].artist;
      
    }

    //Changes the Album Art to the current track's album art
    function albumArt() {
      var selected = playlist.querySelector(".selected");
      current = selected.getAttribute("id").slice(4);
      current = Number(current);

      albumArtPicture.src = songs[current].art;
    }
    