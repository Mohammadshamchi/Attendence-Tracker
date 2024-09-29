import React, { useState } from "react";
import { initialClasses } from "./FakeData";
import { getCurrentFormattedDate } from "./dateUtils.ts";
import { Button } from "@/components/ui/button";
import AddClass from "@/components/AddClass";

function ClassesPage() {
    const [classes, setClasses] = useState(initialClasses);
    const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
    const formattedDate = getCurrentFormattedDate();

    const openAddClassModal = () => setIsAddClassModalOpen(true);
    const closeAddClassModal = () => setIsAddClassModalOpen(false);

    return (
        <div className="max-w-3xl mx-auto px-4 mt-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">All Classes</h1>
                    <p className="text-gray-500">{formattedDate}</p>
                </div>
                <Button onClick={openAddClassModal}>Add Class</Button>
            </div>
            <div className="space-y-3">
                {classes.map((classItem) => (
                    <div key={classItem.id} className="bg-gray-100 rounded-lg p-4 flex justify-between items-center">
                        <span className="font-medium">{classItem.name}</span>
                        <div className="flex items-center">
                            <span className="text-gray-500 mr-2">{classItem.time}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            {isAddClassModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Add New Class</h2>
                            <button onClick={closeAddClassModal} className="text-gray-500 hover:text-gray-700">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <AddClass onSubmit={(newClass) => {
                            // Handle the new class data here
                            console.log(newClass);
                            // You might want to add the new class to your classes state
                            // setClasses([...classes, newClass]);
                            closeAddClassModal();
                        }} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ClassesPage;