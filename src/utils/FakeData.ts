interface ClassData {
  id: number;
  name: string;
  info: string;
  participants: string[];
  startDate: Date;
  endDate: Date;
  classHours: {
    start: string;
    end: string;
  };
}

export const initialClasses: ClassData[] = [
  {
    id: 1,
    name: "Introduction to React",
    info: "Learn the basics of React framework",
    participants: ["Alice", "Bob", "Charlie"],
    startDate: new Date(2024, 8, 1), // September 1, 2024
    endDate: new Date(2024, 11, 15), // December 15, 2024
    classHours: {
      start: "10:00",
      end: "12:00"
    }
  },
  {
    id: 2,
    name: "Advanced JavaScript",
    info: "Deep dive into JavaScript concepts",
    participants: ["David", "Eve", "Frank"],
    startDate: new Date(2024, 8, 5), // September 5, 2024
    endDate: new Date(2024, 11, 20), // December 20, 2024
    classHours: {
      start: "14:00",
      end: "16:00"
    }
  },
  // Add more classes as needed
];
interface StudentData {
  student_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  signup_date: Date;
  class_signed_up: string[];
  attendance_history: {
    class_id: string;
    date: Date;
    attended: boolean;
  }[];
  email?: string; // Optional field
}

export const initialStudents: StudentData[] = [
  {
    student_id: "S001",
    first_name: "John",
    last_name: "Doe",
    phone_number: "123-456-7890",
    signup_date: new Date("2024-01-15"),
    class_signed_up: ["C001", "C002"],
    attendance_history: [
      { class_id: "C001", date: new Date("2024-02-01"), attended: true },
      { class_id: "C002", date: new Date("2024-02-03"), attended: false },
    ],
    email: "john.doe@example.com"
  },
  {
    student_id: "S002",
    first_name: "Jane",
    last_name: "Smith",
    phone_number: "987-654-3210",
    signup_date: new Date("2024-01-20"),
    class_signed_up: ["C001"],
    attendance_history: [
      { class_id: "C001", date: new Date("2024-02-01"), attended: true },
    ],
    email: "jane.smith@example.com"
  },
  // Add more student records as needed
];


export type { ClassData,StudentData };
