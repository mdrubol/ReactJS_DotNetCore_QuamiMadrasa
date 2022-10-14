import EmployeeType from "./employeeType.model"

interface Staff {
    id: number
    userId: number
    employeeTypeId: number
    employeeType: EmployeeType
    code: string
    empDate: string,
    fullName:string
}

export default Staff;