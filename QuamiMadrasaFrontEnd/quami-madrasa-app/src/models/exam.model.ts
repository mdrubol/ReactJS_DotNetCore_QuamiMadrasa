import ExamRecord from "./examRecord.model"

interface Exam{
    id:number
    name:string
    term:number
    year:string
    examRecords:Array<ExamRecord>
}

export default Exam;