import ClassType from "./classType.model"
import Hostel from "./hostel.model"
import Section from "./section.model"

 interface Student {
    id:number
    userId: number

    myClassId: number
    myClass: ClassType

    sectionId: number
    section: Section

    admNo: string

    myParentId: number

    hostelId: number
    hostel: Hostel

    hostelRoomNo: string

    session: string

    house: string

    age: number

    yearAdmitted: string

    grad: number

    gradDate: string

}

export default Student;