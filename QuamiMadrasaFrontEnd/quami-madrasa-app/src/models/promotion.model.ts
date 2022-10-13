import Student from "./student.model"

interface Promotion {
    studentId: number
    student: Student
    fromClass: number
    fromSection: number
    toClass: number
    toSection: number
    grad: number
    fromSession: string
    toSession: string
    status: string
}

export default Promotion;