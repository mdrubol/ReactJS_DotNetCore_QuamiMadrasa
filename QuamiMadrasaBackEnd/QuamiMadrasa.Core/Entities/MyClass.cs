using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
#nullable disable
namespace QuamiMadrasa.Core.Entities
{
    public class MyClass : BaseEntity
    {
        public string Name { get; set; }

        public int? ClassTypeId { get; set; }
        public ClassType ClassType { get; set; }
        public virtual ICollection<ExamRecord> ExamRecords { get; set; }
    }
}
