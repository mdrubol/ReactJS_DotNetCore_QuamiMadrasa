using QuamiMadrasa.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuamiMadrasa.Core.Interfaces
{
    public interface INoticeRepository
    {
        Task<Notice> UpdateNotice(Notice Notice);
        Task<Notice> AddNotice(Notice Notice);
        Task<bool> DeleteNotice(int id);
        Task<List<Notice>> GetAllNotices();
        Task<Notice> GetNoticeById(int id);
    }
}
