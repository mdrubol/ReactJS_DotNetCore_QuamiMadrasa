using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
#nullable disable
namespace QuamiMadrasa.Core.Entities
{
    public class Receipt : BaseEntity
    {
        public int PrId { get; set; }

        public int AmtPaid { get; set; }

        public int Balance { get; set; }

        public string Year { get; set; }
    }
}
