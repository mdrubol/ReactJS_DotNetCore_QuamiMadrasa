using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

#nullable disable
namespace QuamiMadrasa.Core.Entities
{
    public class Promotion : BaseEntity
    {
        public int StudentId { get; set; }
        public Student Student { get; set; }

        public int FromClass { get; set; }

        public int FromSection { get; set; }

        public int ToClass { get; set; }

        public int ToSection { get; set; }

        public short Grad { get; set; }

        public string FromSession { get; set; }

        public string ToSession { get; set; }

        public string Status { get; set; }
    }
}
