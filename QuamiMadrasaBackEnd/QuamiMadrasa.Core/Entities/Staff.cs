using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
#nullable disable
namespace QuamiMadrasa.Core.Entities
{
    public class Staff : BaseEntity
    {
        public int? UserId { get; set; }
        public string FullName { get; set; }
        public int EmployeeTypeId { get; set; }

        public EmployeeType EmployeeType { get; set; }  

        public string Code { get; set; }

        public string EmpDate { get; set; }
    }
}
