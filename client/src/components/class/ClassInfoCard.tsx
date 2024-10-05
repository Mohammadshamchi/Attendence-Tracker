import { ClassData } from "@/FakeData";

interface ClassInfoCardProps {
    classInfo: ClassData;
}

export default function ClassInfoCard({ classInfo }: ClassInfoCardProps) {
    if (!classInfo) {
        return <div>No class information available</div>;
    }

    return (
        <div className="dashboard-classes">
            <div className="class-container">
                <div className="class-item">
                    <span className="class-name">{classInfo.name || 'No name'}</span>
                    {classInfo.classHours ? (
                        <span className="class-time">
                            {classInfo.classHours.start} to {classInfo.classHours.end}
                        </span>
                    ) : (
                        <span className="class-time">Time not available</span>
                    )}
                    <span className="arrow">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 6L15 12L9 18" stroke="#2C2C2C" strokeWidth="2" />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
}