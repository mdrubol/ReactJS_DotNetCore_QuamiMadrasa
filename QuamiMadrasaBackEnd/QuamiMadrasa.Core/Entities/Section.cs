using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
#nullable disable
namespace QuamiMadrasa.Core.Entities
{
    public class Section : BaseEntity
    {
        public string Name { get; set; }

        public int MyClassId { get; set; }

        public int? TeacherId { get; set; }
        public Staff Staff { get; set; }

        public short Active { get; set; }
        public virtual ICollection<ExamRecord> ExamRecords { get; set; }
    }
}
