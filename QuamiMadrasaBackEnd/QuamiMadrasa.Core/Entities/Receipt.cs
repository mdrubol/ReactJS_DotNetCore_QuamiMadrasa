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
        public string ReceiptNo { get; set; }
        public int StudentId { get; set; }
        public int JamatId { get; set; }
        public string ReceiptDate { get; set; }
        public decimal AdmissionFee { get; set; }
        public decimal ReAdmissionFee { get; set; }
        public decimal TransportFee { get; set; }
        public decimal SalaryFee { get; set; }
        public decimal ExamFee { get; set; }
        public decimal GeneratorFee { get; set; }
        public decimal CharecterCertFee { get; set; }
        public decimal TcFee { get; set; }
        public decimal MiscFee { get; set; }
    }
}
