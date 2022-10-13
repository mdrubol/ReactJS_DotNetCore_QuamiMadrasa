import Exam from './exam.model';
import Grade from './grade.model';
import MyClass from './myClass.model';
import Section from './section.model';
import Student from './student.model';
import Subject from './subject.model';

interface Mark {
    studentId: number
    student: Student
    subjectId: number
    subject: Subject
    myClassId: number
    myClass: MyClass
    sectionId: number
    section: Section
    examId: number
    exam: Exam
    t1: number
    t2: number
    t3: number
    t4: number
    tca: number
    exm: number
    tex1: number
    tex2: number
    tex3: number
    subPos: number
    cum: number
    cumAve: string
    gradeId: number
    grade: Grade
    year: string
}

export default Mark;