using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
#nullable disable
namespace QuamiMadrasa.Core.Entities
{
    public class Exam : BaseEntity
    {
        public string Name { get; set; }

        public short Term { get; set; }

        public string Year { get; set; }

        public virtual ICollection<ExamRecord> ExamRecords { get; set; }    
    }
}
