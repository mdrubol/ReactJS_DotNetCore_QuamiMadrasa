using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
#nullable disable
namespace QuamiMadrasa.Core.Entities
{
    public class PaymentDetail : BaseEntity
    {
        public int PaymentId { get; set; }
        public Payment Payment { get; set; }

        public int StudentId { get; set; }
        public Student Student { get; set; }    

        public string RefNo { get; set; }

        public int? AmtPaid { get; set; }

        public int? Balance { get; set; }

        public short Paid { get; set; }

        public string Year { get; set; }
    }
}
