export default function ClassInfoCard({ classInfo }) {
    return (
        <div className="dashboard-classes">
            <div className="class-container">
                <div className="class-item">
                    <span className="class-name">Class 1</span>
                    <span className="class-time">10:00-14:00</span>
                    <span className="arrow"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6L15 12L9 18" stroke="#2C2C2C" stroke-width="2" />
                    </svg>
                    </span>
                </div>
            </div>
        </div>
    );
}
