using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuamiMadrasa.Core.Entities;
using QuamiMadrasa.Core.Interfaces;
using QuamiMadrasa.Infrastracture.Repositories;
using QuamiMadrasa.WebApi.DTOs;

namespace QuamiMadrasa.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class NoticeController : BaseController
    {
        private readonly INoticeRepository _NoticeRepository;
        private readonly IMapper _mapper;
        public NoticeController(INoticeRepository NoticeRepository, IMapper mapper)
        {
            _NoticeRepository = NoticeRepository;
            _mapper = mapper;
        }
        
        [HttpGet]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetNotices")]
        public async Task<ActionResult> GetNotices()
        {
           var notices = await _NoticeRepository.GetAllNotices();

            return Ok(notices);
        }


        [HttpGet]
        [Route("GetActiveNotices")]
        public async Task<ActionResult> GetActiveNotices()
        {
            var notices = await _NoticeRepository.GetAllNotices();

            var active_notices = notices.Where(n=> n.IsPublished == true && n.FromDate.Date <= DateTime.UtcNow.Date && n.ToDate.Date >= DateTime.UtcNow.Date).ToList();

            return Ok(active_notices);
        }

        [HttpGet]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("GetNoticeById")]
        public async Task<ActionResult> GetNoticeById(int id)
        {
            var student = await _NoticeRepository.GetNoticeById(id);

            return Ok(student);
        }

        [HttpPut]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("UpdateNotice")]
        public async Task<ActionResult> UpdateNotice(Notice  Notice)
        {
            var stud = await _NoticeRepository.UpdateNotice(Notice);

            return Ok(stud);
        }

        [HttpDelete]
        [Authorize(Roles = "Administrator,Teacher")]
        [Route("DeleteNotice")]
        public async Task<ActionResult> DeleteNotice(int id)
        {
            var deleted = await _NoticeRepository.DeleteNotice(id);

            return Ok(deleted);
        }

        [HttpPost]
        [Authorize(Roles = "Administrator,Teacher,Accountant")]
        [Route("CreateNotice")]
        public async Task<ActionResult> CreateNotice(Notice notice)
        {
            try
            {
                var stud = await _NoticeRepository.AddNotice(_mapper.Map<Notice>(notice));

                return Ok(stud);
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.Message);
            }

        }
    }
}
