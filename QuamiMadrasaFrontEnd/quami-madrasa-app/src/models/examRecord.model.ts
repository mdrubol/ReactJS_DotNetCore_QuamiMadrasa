import Exam from "./exam.model"
import MyClass from "./myClass.model"
import Section from "./section.model"
import Student from "./student.model"

interface ExamRecord {
    id: number
    examId: number
    exam: Exam
    studentId: number
    student: Student
    myClassId: number
    myClass: MyClass
    sectionId: number
    section: Section
    total: number
    ave: string
    classAve: string
    pos: number
    af: string
    ps: string
    pComment: string
    tComment: string
    year: string
}

export default ExamRecord;