using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
#nullable disable
namespace QuamiMadrasa.Core.Entities
{
    public class Payment : BaseEntity
    {
        public string Title { get; set; }

        public int Amount { get; set; }

        public string RefNo { get; set; }

        public string Method { get; set; }

        public int? MyClassId { get; set; }
        public MyClass MyClass { get; set; }

        public string Description { get; set; }

        public string Year { get; set; }
    }
}
