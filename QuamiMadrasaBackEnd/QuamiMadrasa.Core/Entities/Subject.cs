using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

#nullable disable
namespace QuamiMadrasa.Core.Entities
{
    public class Subject : BaseEntity
    {
        public string Name { get; set; }

        public string Slug { get; set; }

        public int MyClassId { get; set; }
        public MyClass MyClass { get; set; }    

        public int TeacherId { get; set; }
        public Staff Teacher { get; set; }    
    }
}
