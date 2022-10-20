using QuamiMadrasa.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuamiMadrasa.Core.Interfaces
{
    public interface IReceiptRepository
    {
        Task<Receipt> UpdateReceipt(Receipt Receipt);
        Task<Receipt> AddReceipt(Receipt Receipt);
        Task<bool> DeleteReceipt(int id);
        Task<List<Receipt>> GetAllReceipts();
        Task<Receipt> GetReceiptById(int id);
    }
}
