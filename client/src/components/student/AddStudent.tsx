import { useEffect, useState } from "react";
import axios from "axios";
import ClassSearch from "../class/ClassSearch";


export default function AddStudent() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [selectedClass, setSelectedClass] = useState<ClassData[]>([]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            setSubmitError("");
            try {
                const response = await axios.post("http://localhost:5001/api/students", {
                    first_name: firstName.trim(),
                    last_name: lastName.trim(),
                    phone_number: phoneNumber.trim(),
                    class_signed_up: selectedClass.map(c => c.name),
                    notes: notes.trim()
                });
                console.log("Student added successfully:", response.data);
                // Reset form
                setFirstName("");
                setLastName("");
                setPhoneNumber("");
                setNotes("");
            } catch (error) {
                console.error("Error adding student:", error);
                setSubmitError("Failed to add student. Please try again.");
            } finally {
                setIsLoading(false);
            }
            setSelectedClass([]);
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
        if (selectedClass.length === 0) newErrors.selectedClass = "Please select at least one Class";
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
                        Class Search
                    </label>
                    <ClassSearch selectedClass={selectedClass} setSelectedClass={setSelectedClass} />
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
                {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

                <button
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 transition-colors"
                    disabled={isLoading}
                >
                    {isLoading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}