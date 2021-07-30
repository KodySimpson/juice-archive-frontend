import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {

    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState({
        fileName: 'Rockstar Status - Juice WRLD.mp3'
    });
    const [queue, setQueue] = useState([]);
    const [history, setHistory] = useState([]);

    function play() {
        document.querySelector("audio").play().then(r => console.log("Playing song."));
    }

    useEffect(() => {

        // axios.get('http://localhost:8080/music')
        //     .then(function (response) {
        //         // handle success
        //         setSongs(response.data);
        //     })
        //     .catch(function (error) {
        //         // handle error
        //         console.log(error);
        //     });

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
        return <SongListing song={song} playSong={playSong} queueSong={queueSong} key={song.id}></SongListing>;
    });

    let queueList = '';
    if (queue) {
        queueList = queue.map((song) => {
            return <QueueListing song={song} playSong={playSong} dequeueSong={dequeueSong} queueSong={queueSong} key={song.id}></QueueListing>;
        });
    }

    function playSong(songKey) {
        setCurrentSong(songKey);
    }

    function restartSong() {
        document.querySelector("audio").currentTime = 0;
    }


    function queueSong(songKey) {
        setQueue([...queue, songKey]);
    }

    function dequeueSong(songQueueIndex) {
        const currentQueue = [...queue];
        console.log("current queue: " + currentQueue);
        currentQueue.splice(songQueueIndex);
        console.log("spliced queue: " + currentQueue);
        setQueue(currentQueue);
    }

    let queuePanel = '';
    if (!queue.isEmpty) {
        queuePanel = (
            <div class="flex flex-col pb-10">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="shadow overflow-hidden border-gray-900 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-900">
                                <tr>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-left text-lg font-lg text-gray-50 uppercase tracking-wider"
                                    >
                                        Playing/Queue
                                    </th>
                                    <th scope="col" class="relative px-6 py-3">
                                        <span class="sr-only">Play</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="bg-gray-900">
                                    <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-white bg-gray-900">
                                        {currentSong.fileName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium inline-flex space-x-2 bg-gray-900">
                                        <button onClick={prevSong} type="button"
                                                className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"/>
                                            </svg>
                                        </button>
                                        <button
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                            onClick={restartSong}>Restart
                                        </button>
                                        <button onClick={nextSong} type="button"
                                                className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
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

        <div class="mx-auto md:max-w-4xl mt-50">

            <div class="bg-gray-900 text-center m-20 rounded-3xl pt-3">
                <h1 class="text-6xl font-extrabold text-white">Juice Archive</h1>
                <img src="https://media.tenor.com/images/0e8d94666a84b1bf736a0326ed7f71b7/tenor.gif" class="mx-auto"/>
                <div className="inline-flex pb-2 space-x-2">
                    <button type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
                        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                             fill="currentColor" aria-hidden="true">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                        Home
                    </button>
                    <button type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
                        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                             fill="currentColor" aria-hidden="true">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                        Catalog
                    </button>
                    <button type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
                        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                             fill="currentColor" aria-hidden="true">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                        Playlists
                    </button>
                </div>
                <audio onEnded={nextSong} className="mx-auto w-full"
                       src={'https://kody.sfo3.cdn.digitaloceanspaces.com/juice/' + currentSong.fileName} controls>
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
                                <thead class="bg-gray-900">
                                <tr>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
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
        <tr class="bg-gray-900">
            <td class="px-6 py-4 whitespace-nowrap text-lg font-medium text-white">
                {props.song.fileName}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium inline-flex space-x-2">
                <button onClick={() => props.queueSong(props.song)} type="button"
                        class="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         aria-hidden="true">
                        <path fill-rule="evenodd"
                              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                              clip-rule="evenodd"/>
                    </svg>
                </button>
                <button
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onClick={() => props.playSong(props.song)}>Play
                </button>
            </td>
        </tr>
    );

}

function QueueListing(props) {

    return (
        <tr class="bg-white">
            <td class="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900">
                <a href="#" className="hover:bg-gray-300"><span>{props.song.fileName}</span></a>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium inline-flex space-x-2">
                <button onClick={() => props.dequeueSong(props.song)} type="button"
                        className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <button
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => props.playSong(props.song)}>Play
                </button>
                <button onClick={() => props.queueSong(props.song)} type="button"
                        className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         aria-hidden="true">
                        <path fill-rule="evenodd"
                              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                              clip-rule="evenodd"/>
                    </svg>
                </button>
            </td>
        </tr>
    );

}

export default App;
