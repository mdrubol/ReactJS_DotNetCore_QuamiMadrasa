import MyClass from "./myClass.model"
import Staff from "./staff.model"

interface Subject {
    id: number
    name: string
    slug: string
    myClassId: number
    myClass: MyClass
    teacherId: number
    teacher: Staff
}

export default Subject;