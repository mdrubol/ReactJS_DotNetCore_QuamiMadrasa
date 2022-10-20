using QuamiMadrasa.Core.Entities;
using QuamiMadrasa.Core.Interfaces;
using QuamiMadrasa.Infrastracture.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuamiMadrasa.Infrastracture.Repositories
{
    public class ReceiptRepository : IReceiptRepository
    {
        private readonly QuamiMadrasaDBContext _quamiMadrasaContext;
        private readonly IGenericRepository<Receipt> _genericRepository;
        public ReceiptRepository(QuamiMadrasaDBContext quamiMadrasaContext, IGenericRepository<Receipt> genericRepository)
        {
            _quamiMadrasaContext = quamiMadrasaContext;
            _genericRepository = genericRepository;
        }
        public async Task<Receipt> AddReceipt(Receipt Receipt)
        {
           await _quamiMadrasaContext.AddAsync(Receipt);
             _quamiMadrasaContext.SaveChanges();
            return Receipt;
        }

        public async Task<bool> DeleteReceipt(int id)
        {
            var Receipt = await _genericRepository.GetByIdAsync(id);

            if(Receipt != null)
            {
                _genericRepository.Delete(Receipt);
                _quamiMadrasaContext.SaveChanges();
                return true;
            }

            return false;
        }

        public async Task<List<Receipt>> GetAllReceipts()
        {
            var Receipts = await _genericRepository.GetAllAsync();

            return Receipts.ToList();
        }

        public async Task<Receipt> GetReceiptById(int id)
        {
            var Receipt = await _genericRepository.GetByIdAsync(id);

            return Receipt;
        }

        public async Task<Receipt> UpdateReceipt(Receipt Receipt)
        {
            var stu = await _genericRepository.GetByIdAsync(Receipt.Id);

            stu.UpdatedAt = DateTime.UtcNow;
            stu.MiscFee = Receipt.MiscFee;
            stu.CharecterCertFee = Receipt.CharecterCertFee;
            stu.TcFee = Receipt.TcFee;
            stu.TransportFee = Receipt.TransportFee;
            stu.AdmissionFee = Receipt.AdmissionFee;
            stu.ReAdmissionFee = Receipt.ReAdmissionFee;
            stu.ExamFee = Receipt.ExamFee;
            stu.GeneratorFee = Receipt.GeneratorFee;
            stu.SalaryFee = Receipt.SalaryFee;

            _genericRepository.Update(stu);
            _quamiMadrasaContext.SaveChanges();

            return stu;
        }
    }
}
