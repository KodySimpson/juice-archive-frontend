import {useEffect, useState, useReducer} from "react";
import {
    useHistory
} from "react-router-dom";
import SongService from "../services/SongService";

export default function UploadSong(props){

    let history = useHistory();

    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [favorited, setFavorited] = useState(false);
    const [error, setError] = useState('');
    const [file, setFile] = useState();

    function onFileChange(e){
        setFile(e.target.files[0]);
    }

    function createSongHandler(){

        setError("");
        if (title.length > 0 && artist.length > 0){
            if (file){

                let formData = new FormData();
                formData.append("file", file);
                formData.append("song", new Blob([JSON.stringify({
                    title: title,
                    artist: artist,
                    favorited: favorited
                })], {
                    type: "application/json"
                }));

                SongService.createSong(formData).then(function (response) {
                    history.push("/songs/" + response.data.id);
                    props.refreshSongs();
                }).catch(function (error) {
                    if (error.response.data === "taken"){
                        setError("A song with this file name or title already exists");
                    }
                })
            }else{
                setError("A file was not provided.");
            }
        }else{
            setError("A title and artist must be provided.")
        }

    }

    function back(){
        history.push("/catalog");
    }

    return (
        <div className="mt-5 md:mt-0 md:col-span-2 mb-40 bg-gray-900 border-2 rounded-xl border-gray-800">
            <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-gray-900 sm:p-6">

                    <p className="text-red-500 text-xl text-center pb-5">{error}</p>

                    <div className="grid grid-cols-6 gap-6">

                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                            <label htmlFor="email-address" className="block text-lg font-medium text-white">Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="email-address" id="email-address" autoComplete="email"
                                   className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full text-lg shadow-sm sm:text-lg border-gray-300 rounded-md" />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                            <label htmlFor="city" className="block text-lg font-medium text-white">Artist</label>
                            <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} name="city" id="city"
                                   className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md" />
                        </div>

                        <div className="sm:grid sm:grid-cols-6 col-span-6 sm:gap-4 sm:items-start sm:pt-5 mx-auto">
                            <label htmlFor="cover-photo" className="block text-xl font-medium text-white sm:mt-px sm:pt-2">
                                Song File
                            </label>
                            <div className="mt-1 sm:mt-0 col-span-6">
                                <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <div className="flex text-md text-blue-500">
                                            <input onChange={(e) => onFileChange(e)} id="file-upload" name="file-upload" type="file" />
                                        </div>
                                        <p className="text-lg text-gray-500">
                                            MP3 up to 20MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-6">

                            <div className="text-center space-x-2">
                                {
                                    (favorited) ?
                                        <button type="button" className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        :
                                        <button type="button" className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-gray-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                }
                            </div>

                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 bg-gray-800 text-right sm:px-6 space-x-2">
                    <button onClick={back} type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Back
                    </button>
                    <button onClick={createSongHandler} type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Create
                    </button>
                </div>
            </div>
        </div>
    );


}