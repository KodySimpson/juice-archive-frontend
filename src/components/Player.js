import QueuePanel from "./QueuePanel";
import {useState} from "react";

export default function Player(props){

    const [hidePanel, setHidePanel] = useState(true);

    return (
        <div className="fixed bottom-0 mx-auto w-3/6">
            {/*<div className="w-full">*/}
            {/*    <input type="range" min="1" max={props.duration} value={props.currentTime} className="w-full" />*/}
            {/*</div>*/}
            <div className="bg-gray-800 rounded-t-xl text-center">
                {/*<input type="range" min="1" max="100" value="50" />*/}
                <div className="inline-flex">
                    <div className="px-6 py-4 whitespace-nowrap text-sm font-medium inline-flex space-x-2">
                        <button onClick={() => setHidePanel(!hidePanel)} type="button"
                                className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <div className="px-6 py-4 whitespace-nowrap text-xl font-medium text-white text-center">
                        {props.currentSong.title + ' - ' + props.currentSong.artist}
                    </div>
                    <div className="px-6 py-4 whitespace-nowrap text-sm font-medium inline-flex space-x-2">
                        <button onClick={props.prevSong} type="button"
                                className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                        </button>
                        {
                            (props.isPlaying) ?
                                <button onClick={props.pauseSong} type="button" className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button> :
                                <button onClick={props.play} type="button" className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                        }

                        <button onClick={props.nextSong} type="button"
                                className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
                {
                    (!hidePanel) ? <div className="px-5">
                        <QueuePanel currentSong={props.currentSong} queue={props.queue} playSongButton={props.playSongButton} setQueue={props.setQueue} />
                    </div> : ''
                }
            </div>
        </div>
    )

}