using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
#nullable disable
namespace QuamiMadrasa.Core.Entities
{
    public class Hostel : BaseEntity
    {
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
