using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
#nullable disable
namespace QuamiMadrasa.Core.Entities
{
    public class EmployeeType : BaseEntity
    {
        public string Name { get; set; }

        public string Code { get; set; }

        public virtual ICollection<Staff> Staffs { get; set; }
    }
}
