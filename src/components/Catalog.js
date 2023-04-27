import {
    Link
} from "react-router-dom";
import {useEffect, useState} from "react";
import Loading from "./Loading";

export default function Catalog(props){

    const [results, setResults] = useState([props.songs]);
    const {favoriteHandler, isLoading, songs} = props;

    //when the songs are done loading, use that as the basis for the results to display for searching to be done
    useEffect(function () {
        setResults(songs);
    }, [isLoading]);

    function searchHandler(e){
        const searchTerm = e.target.value;
        setResults(songs.filter(song => song.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }

    return (
        <div>
            {
                (isLoading) ? <Loading /> :
                    <div>
                        <div className="mx-16 pb-6">
                            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                <label htmlFor="songTitle" className="block text-lg font-medium text-white">Search:</label>
                                <input onChange={(e) => searchHandler(e)} placeholder="Type a song title..." type="text" name="songTitle" id="songTitle"
                                       className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full text-lg shadow-sm sm:text-lg border-gray-300 rounded-md" />
                            </div>
                        </div>

                        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {
                                results.map(function (song) {
                                    return <li key={song.id} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                                        <div className="w-full flex items-center justify-between p-6 space-x-6">
                                            <div className="flex-1 truncate">
                                                <div className="flex items-center space-x-3">
                                                    <h3 className="text-gray-900 text-lg font-medium truncate">{song.title}</h3>
                                                    {/*<span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">Admin</span>*/}
                                                </div>
                                                <p className="mt-1 text-gray-500 text-sm truncate">{song.artist}</p>
                                            </div>
                                            <div className="text-center">
                                                {
                                                    (song.favorited) ?
                                                        <button onClick={() => favoriteHandler(song)} type="button" className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                        :
                                                        <button onClick={() => favoriteHandler(song)} type="button" className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-gray-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                            </svg>
                                                        </button>
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            <div className="-mt-px flex divide-x divide-gray-200">
                                                <div className="w-0 flex-1 flex">
                                                    <Link to={'/song/' + song.id} className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-blue-500">
                                                        <span className="ml-3">Edit</span>
                                                    </Link>
                                                </div>
                                                <div className="-ml-px w-0 flex-1 flex">
                                                    <button className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-blue-500">
                                                        <span className="ml-3" onClick={() => props.queueSong(song)}>Queue</span>
                                                    </button>
                                                </div>
                                                <div className="-ml-px w-0 flex-1 flex">
                                                    <button className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-blue-500">
                                                        <span className="ml-3" onClick={() => props.playSongButton(song)}>Play</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
            }



        </div>
    );

}