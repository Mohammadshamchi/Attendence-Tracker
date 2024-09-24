import React from 'react';

export default function AddClass() {
    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Class Title</h2>
            <form>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Value"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Days of the Week
                    </label>
                    <input
                        type="text"
                        placeholder="Value"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex mb-4 space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            From
                        </label>
                        <input
                            type="text"
                            placeholder="Value"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            to
                        </label>
                        <input
                            type="text"
                            placeholder="Value"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Students List"
                            className="w-full p-2 pr-8 border border-gray-300 rounded"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Anything for Notes
                    </label>
                    <textarea
                        placeholder="Value"
                        rows="3"
                        className="w-full p-2 border border-gray-300 rounded"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition-colors"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}