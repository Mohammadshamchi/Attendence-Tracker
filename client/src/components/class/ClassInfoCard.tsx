import React from 'react';
import { useNavigate } from "react-router-dom";

interface ClassHours {
    start: string;
    end: string;
}

interface ClassData {
    _id: string;
    name: string;
    classHours?: ClassHours;
    // Add other properties as needed
}

interface ClassInfoCardProps {
    classInfo: ClassData;
}

const ClassInfoCard: React.FC<ClassInfoCardProps> = ({ classInfo }) => {
    const navigate = useNavigate();

    if (!classInfo) {
        return <div>No class information available</div>;
    }

    const handleClassClick = () => {
        navigate("/classdetail", { state: { classData: classInfo } });
    };

    return (
        <button
            onClick={handleClassClick}
            className="classinfocard-container w-full text-left"
            aria-label={`View details for ${classInfo.name}`}
        >
            <div className="dashboard-classes">
                <div className="class-item flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div>
                        <h3 className="class-name text-lg font-semibold">
                            {classInfo.name || 'Unnamed Class'}
                        </h3>
                        {classInfo.classHours ? (
                            <p className="class-time text-sm text-gray-600">
                                {classInfo.classHours.start} to {classInfo.classHours.end}
                            </p>
                        ) : (
                            <p className="class-time text-sm text-gray-400">Time not available</p>
                        )}
                    </div>
                    <span className="arrow">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 6L15 12L9 18" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </div>
            </div>
        </button>
    );
}

export default ClassInfoCard;