import Staff from "./staff.model"

interface Section {
    id: number
    name: string
    myClassId: number
    teacherId: number
    staff: Staff
    active: number
}

export default Section;