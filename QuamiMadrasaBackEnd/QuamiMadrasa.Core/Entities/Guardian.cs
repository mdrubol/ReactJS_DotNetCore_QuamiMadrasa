using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuamiMadrasa.Core.Entities
{
    public class Guardian : BaseEntity
    {
        public string FullName { get; set; }
        public string MobileNo { get; set; }
        public string Address { get; set; }
        public string Relationship { get; set; }
    }
}
