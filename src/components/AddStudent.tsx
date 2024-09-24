export default function AddStudent() {
    return (
        <div className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">

            <form className="space-y-4">
                <div>
                    <h4 className="text-l mb-3">Name</h4>
                    <input
                        type="text"
                        placeholder="First Name"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                    </label>
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        placeholder="0921 446 5035"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Anything for Notes
                    </label>
                    <textarea
                        placeholder="Value"
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}