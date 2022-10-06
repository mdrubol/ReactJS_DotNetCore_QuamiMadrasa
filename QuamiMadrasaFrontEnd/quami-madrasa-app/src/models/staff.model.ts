import EmployeeType from "./employeeType.model"

interface Staff {
    id: number
    userId: number
    employeeTypeId: number
    employeeType: EmployeeType
    code: string
    empDate: string
}

export default Staff;