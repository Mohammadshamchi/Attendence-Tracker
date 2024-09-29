import { useState } from "react";

export default function AddStudent() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (validateForm()) {
            // Todo: Send data to the server
            console.log("First Name:", firstName.trim());
            console.log("Last Name:", lastName.trim());
            console.log("Phone Number:", phoneNumber.trim());
            console.log("Notes:", notes.trim());
        }
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
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!firstName.trim()) newErrors.firstName = "First name is required and cannot be just spaces";
        if (!lastName.trim()) newErrors.lastName = "Last name is required and cannot be just spaces";
        if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
        else if (phoneNumber.trim().length < 10) newErrors.phoneNumber = "Phone number must be at least 10 characters long";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };;


    return (
        <div className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">

            <form className="space-y-4" action="signup" id="student-signup-form" onSubmit={handleSubmit}>
                <div>
                    <h4 className="text-l mb-3">Name</h4>
                    <input
                        type="text"
                        placeholder="First Name"
                        className={`w-full p-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md`} onChange={handleFirstNameChange}
                        required
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                    </label>
                    <input
                        type="text"
                        placeholder="Last Name"
                        className={`w-full p-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        onChange={handleLastNameChange}
                        required
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                    </label>
                    <input
                        type="number"
                        placeholder="0921 446 5035"
                        className={`w-full p-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        onChange={handleNumberChange}
                        required
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
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
                >
                    Submit
                </button>
            </form>
        </div>
    );
}