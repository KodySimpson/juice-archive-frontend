import axios from "axios";
import {useEffect, useState} from "react";

export default function Home(props){

    const [favoritedSongs, setFavoritedSongs] = useState([]);

    useEffect(function () {

        setFavoritedSongs(props.songs.filter(song => song.favorited === true));

    }, [props.loading]);

    function favoriteButton(song){

        console.log(song);

        if(song && !props.loading){
            console.log("Saving the song");
            axios.put("https://juice-archive-b646t.ondigitalocean.app/api/songs/" + song.id, {
                favorited: !song.favorited
            }).then(function (response) {

                props.refreshSongs();

            }).catch(function (error) {
                // handle error
                console.log(error);
            });
        }

    }

    return (
        <>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-900">
                                <tr>

                                    {
                                        (props.loading) ?
                                            <>
                                                <th scope="col"
                                                    className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                                                    Favorited
                                                </th>
                                            </> :
                                            <>
                                                <th scope="col"
                                                    className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                                                    Favorited
                                                </th>
                                                <th scope="col"
                                                    className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                                                </th>
                                            </>
                                    }


                                </tr>
                                </thead>
                                <tbody>

                                {

                                    (props.loading) ?
                                        <>
                                            <div className="bg-gray-900">
                                                <img
                                                    src="https://cdn2.scratch.mit.edu/get_image/gallery/1832260_170x100.png"
                                                    alt="bruh"/>
                                            </div>
                                        </> :
                                        <>
                                            {
                                                favoritedSongs.map((song) => {
                                                    return (
                                                        <tr className="bg-gray-900">
                                                            <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-white">
                                                                {song.title}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium inline-flex space-x-2">
                                                                {
                                                                    (song.favorited) ?
                                                                        <button onClick={() => favoriteButton(song)}
                                                                                type="button"
                                                                                className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                                 className="h-5 w-5" viewBox="0 0 20 20"
                                                                                 fill="currentColor">
                                                                                <path fillRule="evenodd"
                                                                                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                                                      clipRule="evenodd"/>
                                                                            </svg>
                                                                        </button>
                                                                        :
                                                                        <button onClick={() => favoriteButton(song)}
                                                                                type="button"
                                                                                className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-gray-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                                 className="h-5 w-5" fill="none"
                                                                                 viewBox="0 0 24 24"
                                                                                 stroke="currentColor">
                                                                                <path strokeLinecap="round"
                                                                                      strokeLinejoin="round"
                                                                                      strokeWidth={2}
                                                                                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                                                            </svg>
                                                                        </button>
                                                                }
                                                                <button onClick={() => props.queueSong(song)}
                                                                        type="button"
                                                                        className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                                    <svg className="h-5 w-5"
                                                                         xmlns="http://www.w3.org/2000/svg"
                                                                         viewBox="0 0 20 20" fill="currentColor"
                                                                         aria-hidden="true">
                                                                        <path fill-rule="evenodd"
                                                                              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                                              clip-rule="evenodd"/>
                                                                    </svg>
                                                                </button>
                                                                <button
                                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                                    onClick={() => props.playSongButton(song)}>Play
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </>

                                }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-900">
                                <tr>

                                    {
                                        (props.loading) ?
                                            <>
                                                <th scope="col"
                                                    className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                                                    Songs
                                                </th>
                                            </> :
                                            <>
                                                <th scope="col"
                                                    className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                                                    Songs
                                                </th>
                                                <th scope="col"
                                                    className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                                                </th>
                                            </>
                                    }


                                </tr>
                                </thead>
                                <tbody>

                                {

                                    (props.loading) ?
                                        <>
                                            <div className="bg-gray-900">
                                                <img
                                                    src="https://cdn2.scratch.mit.edu/get_image/gallery/1832260_170x100.png"
                                                    alt="bruh"/>
                                            </div>
                                        </> :
                                        <>
                                            {
                                                props.songs.map((song) => {
                                                    return (
                                                        <tr class="bg-gray-900">
                                                            <td class="px-6 py-4 whitespace-nowrap text-lg font-medium text-white">
                                                                {song.title}
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium inline-flex space-x-2">
                                                                    {
                                                                        (song.favorited) ?
                                                                            <button onClick={() => favoriteButton(song)} type="button" className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                                                </svg>
                                                                            </button>
                                                                            :
                                                                            <button onClick={() => favoriteButton(song)} type="button" className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-gray-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                                                </svg>
                                                                            </button>
                                                                    }
                                                                <button onClick={() => props.queueSong(song)} type="button"
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
                                                                    onClick={() => props.playSongButton(song)}>Play
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </>

                                }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );

}