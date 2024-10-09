import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageInfo from "../components/common/PageInfo";
import { Button } from "@/components/ui/button";
import ClassAttendance from "../components/attendance/ClassAttendance";
import EditClassModal from "../components/class/EditClassModal";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner";

function ClassDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const [classData, setClassData] = useState(location.state?.classData || {});
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        if (location.state?.classData) {
            setClassData(location.state.classData);
        }
    }, [location]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/classes/${classData._id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                toast("Class deleted successfully");
                navigate('/classess'); // Redirect to the classes list page
            } else {
                toast.error("Failed to delete class");
            }
        } catch (error) {
            console.error("Error deleting class:", error);
            toast.error("An error occurred while deleting the class");
        }
    };

    const handleEdit = (updatedClassData) => {
        setIsEditModalOpen(false);
        setClassData(updatedClassData);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 mt-8">
            <div className="flex justify-between items-start mb-6">
                <PageInfo title={classData.name || "Class Title"} subtitle={classData.info || "Class Info"} />
                <div className="flex-grow flex justify-end space-x-4">
                    <Button onClick={() => setIsEditModalOpen(true)}>Edit Class</Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your Class.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <ClassAttendance className={classData.name} />

            {isEditModalOpen && (
                <EditClassModal
                    classData={classData}
                    onSave={handleEdit}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
        </div>
    );
}

export default ClassDetail;