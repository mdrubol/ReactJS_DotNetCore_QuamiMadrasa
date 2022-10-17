using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuamiMadrasa.Core.Entities
{
    public class Head : BaseEntity
    {
        public bool IsDebit { get; set; } // type debit or credit(expense or income type)
        public string Name { get; set; }
        public string Type { get; set; }
    }
}
