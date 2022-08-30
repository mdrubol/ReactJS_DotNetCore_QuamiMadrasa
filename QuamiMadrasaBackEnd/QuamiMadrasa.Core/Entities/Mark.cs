using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
#nullable disable
namespace QuamiMadrasa.Core.Entities
{
    public class Mark : BaseEntity
    {
        public int StudentId { get; set; }
        [NotMapped]
        public Student Student { get; set; }

        public int SubjectId { get; set; }
        [NotMapped]
        public Subject Subject { get; set; }

        public int MyClassId { get; set; }
        [NotMapped]
        public MyClass MyClass { get; set; }

        public int SectionId { get; set; }
        [NotMapped]
        public Section Section { get; set; }

        public int ExamId { get; set; }
        [NotMapped]
        public Exam Exam { get; set; }

        public int? T1 { get; set; }

        public int? T2 { get; set; }

        public int? T3 { get; set; }

        public int? T4 { get; set; }

        public int? Tca { get; set; }

        public int? Exm { get; set; }

        public int? Tex1 { get; set; }

        public int? Tex2 { get; set; }

        public int? Tex3 { get; set; }

        public short? SubPos { get; set; }

        public int? Cum { get; set; }

        public string CumAve { get; set; }

        public int? GradeId { get; set; }
        public Grade Grade { get; set; }

        public string Year { get; set; }
    }
}
