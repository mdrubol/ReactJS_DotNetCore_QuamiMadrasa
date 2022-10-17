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
    public class NoticeRepository : INoticeRepository
    {
        private readonly QuamiMadrasaDBContext _quamiMadrasaContext;
        private readonly IGenericRepository<Notice> _genericRepository;
        public NoticeRepository(QuamiMadrasaDBContext quamiMadrasaContext, IGenericRepository<Notice> genericRepository)
        {
            _quamiMadrasaContext = quamiMadrasaContext;
            _genericRepository = genericRepository;
        }
        public async Task<Notice> AddNotice(Notice Notice)
        {
           await _quamiMadrasaContext.AddAsync(Notice);
             _quamiMadrasaContext.SaveChanges();
            return Notice;
        }

        public async Task<bool> DeleteNotice(int id)
        {
            var Notice = await _genericRepository.GetByIdAsync(id);

            if(Notice != null)
            {
                _genericRepository.Delete(Notice);
                _quamiMadrasaContext.SaveChanges();
                return true;
            }

            return false;
        }

        public async Task<List<Notice>> GetAllNotices()
        {
            var Notices = await _genericRepository.GetAllAsync();

            return Notices.ToList();
        }

        public async Task<Notice> GetNoticeById(int id)
        {
            var Notice = await _genericRepository.GetByIdAsync(id);

            return Notice;
        }

        public async Task<Notice> UpdateNotice(Notice Notice)
        {
            var stu = await _genericRepository.GetByIdAsync(Notice.Id);

            stu.Title = Notice.Title;
            stu.CreatedAt = DateTime.UtcNow;
            stu.UpdatedAt = DateTime.UtcNow;
            stu.Description = Notice.Description;
            stu.IsPublished = Notice.IsPublished;

            _genericRepository.Update(stu);
            _quamiMadrasaContext.SaveChanges();

            return stu;
        }
    }
}
