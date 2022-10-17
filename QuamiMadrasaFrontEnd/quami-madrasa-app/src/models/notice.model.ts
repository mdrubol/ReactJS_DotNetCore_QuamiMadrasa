import Staff from "./staff.model"

interface Section {
    id: number
    fromDate:string
    toDate:string
    title:string
    description:string
    isPublished:boolean
}

export default Section;