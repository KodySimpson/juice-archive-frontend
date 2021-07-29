import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {

    const [songs, setSongs] = useState(['efef']);
    const [currentSong, setCurrentSong] = useState('juice/Rockstar Status - Juice WRLD.mp3');
    const [queue, setQueue] = useState([]);
    const [history, setHistory] = useState([]);

    function play() {
        document.querySelector("audio").play().then(r => console.log("Playing song."));
    }

    useEffect(() => {

        axios.get('https://juice-archive-b646t.ondigitalocean.app/music')
            .then(function (response) {
                // handle success
                setSongs(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });

    }, []);

    useEffect(() => {
        play();
    }, [currentSong]);

    //go to the next song if there is one
    function nextSong() {

        if (queue.length > 0) {
            let nextSong = queue[0];
            console.log("Going to next song: " + nextSong);
            setHistory([...history, currentSong]);
            setCurrentSong(nextSong);
            let currentQueue = [...queue];
            currentQueue.shift();
            setQueue(currentQueue);
        }else{
            //pick a random song to play
            const randIndex = Math.floor(Math.random() * songs.length);
            setHistory([...history, currentSong]);
            setCurrentSong(songs[randIndex]);
        }
    }

    //go to the prev song if there is one
    function prevSong() {

        if (history.length > 0) {
            let currentHistory = history;
            let lastSong = history.pop();
            setHistory(currentHistory);
            console.log("Going to prev song: " + lastSong);
            setQueue([currentSong, ...queue]);
            setCurrentSong(lastSong);
        }
    }

    let songList = songs.map((song) => {
        return <SongListing songName={song} playSong={playSong} queueSong={queueSong}></SongListing>;
    });

    let queueList = '';
    if (queue) {
        queueList = queue.map((song) => {
            return <SongListing songName={song} playSong={playSong} queueSong={queueSong}></SongListing>;
        });
    }

    function playSong(songKey) {
        setCurrentSong(songKey);
    }

    function queueSong(songKey) {
        setQueue([...queue, songKey]);
    }

    let queuePanel = '';
    if (!queue.isEmpty) {
        queuePanel = (
            <div class="flex flex-col pb-10">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Playing/Queue
                                    </th>
                                    <th scope="col" class="relative px-6 py-3">
                                        <span class="sr-only">Play</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="bg-black">
                                    <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-white bg-black">
                                        {currentSong.substr(6)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium inline-flex space-x-2 bg-black">
                                        <button onClick={prevSong} type="button"
                                                className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"/>
                                            </svg>
                                        </button>
                                        <button
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => playSong(currentSong)}>Replay
                                        </button>
                                        <button onClick={nextSong} type="button"
                                                className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                                {queueList}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (

        <div class="mx-auto w-6/12 mt-50">

            <div class="bg-white text-center m-20 rounded-2xl pt-3 px-2">
                <h1 class="text-6xl font-extrabold">Juice Archive</h1>
                <img src="https://media.tenor.com/images/0e8d94666a84b1bf736a0326ed7f71b7/tenor.gif" class="mx-auto"/>
                <audio onEnded={nextSong} className="mx-auto w-full"
                       src={'https://kody.sfo3.cdn.digitaloceanspaces.com/' + currentSong} controls>
                    <source type="audio/mpeg"/>
                    Your browser does not support the audio element.
                </audio>
            </div>

            {queuePanel}

            <div class="flex flex-col">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Song Title
                                    </th>
                                    <th scope="col" class="relative px-6 py-3">
                                        <span class="sr-only">Play</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>

                                {songList}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

function SongListing(props) {

    return (
        <tr class="bg-white">
            <td class="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900">
                {props.songName.substr(6)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium inline-flex space-x-2">
                <button onClick={() => props.queueSong(props.songName)} type="button"
                        class="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         aria-hidden="true">
                        <path fill-rule="evenodd"
                              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                              clip-rule="evenodd"/>
                    </svg>
                </button>
                <button
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => props.playSong(props.songName)}>Play
                </button>
            </td>
        </tr>
    );

}

export default App;
