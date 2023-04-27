import {useEffect, useState} from "react";
import {
    useParams,
    useHistory
} from "react-router-dom";
import SongService from "../services/SongService";

export default function EditSong(props){

    let { id } = useParams();
    let history = useHistory();
    const [song, setSong] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(function () {

        SongService.getSong(id)
            .then(function (response) {
                // handle success
                setSong(response.data);
                setLoading(false);
            });

    },[]);

    function saveSongHandler(){

        if(song && !isLoading){
            console.log("Saving the song.");
            SongService.updateSong(song).then(function (response) {
                console.log("Song Updated.");
                props.updateSong(response.data);
                history.push("/catalog");
            });
        }

    }

    function deleteSongHandler(){

        if (song && !isLoading){
            console.log("Deleting the song.");
            SongService.deleteSong(song).then(function (response) {
                console.log("Song Deleted");
                props.refreshSongs();
                history.push("/catalog");
            })
        }

    }

    function titleChangeHandler(event){

        song.title = event.target.value;
        setSong({
            ...song
        });

    }

    function artistChangeHandler(event){

        song.artist = event.target.value;
        setSong({
            ...song
        });

    }

    function favoriteButtonHandler(){

        song.favorited = !song.favorited;
        setSong({
            ...song
        });

    }

    function back(){

        history.push("/catalog");

    }

    return (
        <div className="mt-5 md:mt-0 md:col-span-2 mb-40 bg-gray-900 border-2 rounded-xl border-gray-800">
            {
                (!isLoading) ?
                    <>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-gray-900 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                            <label htmlFor="email-address" className="block text-lg font-medium text-white">Title</label>
                                            <input type="text" value={song.title} onChange={(e) => titleChangeHandler(e)} name="email-address" id="email-address" autoComplete="email"
                                                   className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full text-lg shadow-sm sm:text-lg border-gray-300 rounded-md" />
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                            <label htmlFor="city" className="block text-lg font-medium text-white">Artist</label>
                                            <input onChange={(e) => artistChangeHandler(e)} type="text" value={song.artist} name="city" id="city"
                                                   className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md" />
                                        </div>

                                        <div className="col-span-6">

                                            <div className="text-center space-x-2">
                                                {
                                                    (song.favorited) ?
                                                        <button onClick={favoriteButtonHandler} type="button" className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                        :
                                                        <button onClick={favoriteButtonHandler} type="button" className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-gray-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                            </svg>
                                                        </button>
                                                }
                                                        <button onClick={deleteSongHandler} type="button" className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-gray-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-800 text-right sm:px-6 space-x-2">
                                    <button onClick={back} type="submit"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                        Back
                                    </button>
                                    <button onClick={saveSongHandler} type="submit"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        Save
                                    </button>
                                </div>
                            </div>
                    </> :
                    <>
                        <img
                            src="https://cdn2.scratch.mit.edu/get_image/gallery/1832260_170x100.png"
                            alt="bruh"/>
                    </>
            }
        </div>
    );


}