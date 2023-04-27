export default function QueuePanel(props){

    function handleDequeue(songToRemove) {

        const currentQueue = [...props.queue];
        const index = currentQueue.findIndex((song) => song.id === songToRemove.id);

        currentQueue.splice(index, 1);
        props.setQueue(currentQueue);
    }

    return (
        <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-gray-900 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-800">
                            <tr>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-lg font-lg text-gray-50 uppercase tracking-wider"
                                >
                                    Playing/Queue
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                props.queue.map((song) => {
                                    return (
                                        <tr class="bg-gray-800">
                                            <td class="px-6 py-4 whitespace-nowrap text-lg font-medium text-white">
                                                <a href="#" className="hover:bg-gray-300"><span>{song.fileName}</span></a>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium inline-flex space-x-2">
                                                <button onClick={() => handleDequeue(song)} type="button"
                                                        className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                                <button
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                    onClick={() => props.playSongButton(song)}>Play
                                                </button>
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
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

}