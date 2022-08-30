using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
#nullable disable
namespace QuamiMadrasa.Core.Entities
{
    public class Grade : BaseEntity
    {
        public string Name { get; set; }

        public int? ClassTypeId { get; set; }

        public short MarkFrom { get; set; }

        public short MarkTo { get; set; }

        public string Remark { get; set; }

    }
}
