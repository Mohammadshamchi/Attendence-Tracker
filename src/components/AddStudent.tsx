import { useState } from "react";

export default function AddStudent() {

    const [firstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [notes, setNotes] = useState("");

    function handleClickSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        // Todo: Send data to the server
        event.preventDefault();
        console.log("First Name: ", firstName)
        console.log("Last Name: ", LastName);
        console.log("Phone Number: ", phoneNumber);
        console.log("Notes: ", notes);

    }
    function handleFirstNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setFirstName(event.target.value);
    }
    function handleLastNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setLastName(event.target.value);
    }

    function handleNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPhoneNumber(event.target.value);
    }
    function handleNoteChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setNotes(event.target.value);
    }

    return (
        <div className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">

            <form className="space-y-4" action="signup" id="student-signup-form">
                <div>
                    <h4 className="text-l mb-3">Name</h4>
                    <input
                        type="text"
                        placeholder="First Name"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        onChange={handleFirstNameChange}
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
                        onChange={handleLastNameChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                    </label>
                    <input
                        type="number"
                        placeholder="0921 446 5035"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        onChange={handleNumberChange}
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
                        onChange={handleNoteChange}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 transition-colors"
                    onClick={handleClickSubmit}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}