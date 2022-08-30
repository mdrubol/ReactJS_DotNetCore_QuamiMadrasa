using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
#nullable disable
namespace QuamiMadrasa.Core.Entities
{
    public class ExamRecord : BaseEntity
    {
        public int ExamId { get; set; }
        public Exam  Exam { get; set; }
        public int StudentId { get; set; }
        [NotMapped]
        public virtual Student Student { get; set; }
        public int MyClassId { get; set; }
        public MyClass MyClass { get; set; }
        public int SectionId { get; set; }
        public Section Section { get; set; }    
        public int? Total { get; set; }

        public string Ave { get; set; }

        public string ClassAve { get; set; }

        public int? Pos { get; set; }

        public string Af { get; set; }

        public string Ps { get; set; }

        public string PComment { get; set; }

        public string TComment { get; set; }

        public string Year { get; set; }
        [NotMapped]
        public virtual ICollection<Student> Students { get; set; }  
    }
}
