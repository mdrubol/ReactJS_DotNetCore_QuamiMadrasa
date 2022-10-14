using Newtonsoft.Json;
using QuamiMadrasa.Core.Entities;

namespace QuamiMadrasa.WebApi.DTOs
{
    public class StaffDto
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string FullName { get; set; }
        public int EmployeeTypeId { get; set; }

        //[JsonIgnore]
        //public EmployeeType EmployeeType { get; set; }

        public string Code { get; set; }

        public string EmpDate { get; set; }
    }
}
