using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

#nullable disable
namespace QuamiMadrasa.Core.Entities
{
    public class Student : BaseEntity
    {
        public int? UserId { get; set; }
        public string FullName { get; set; }
        public int MyClassId { get; set; }
        public MyClass MyClass { get; set; }    

        //public int SectionId { get; set; }
        //public Section Section { get; set; }

        public string AdmNo { get; set; }

        public int? MyParentId { get; set; }

        public int? HostelId { get; set; }
        public Hostel Hostel { get; set; }

        public string HostelRoomNo { get; set; }

        public string Session { get; set; }

        public string House { get; set; }

        public short? Age { get; set; }

        public string YearAdmitted { get; set; }

        public short Grad { get; set; }

        public string GradDate { get; set; }
        [NotMapped]
        public virtual ICollection<ExamRecord> ExamRecords { get; set; }

    }
}
