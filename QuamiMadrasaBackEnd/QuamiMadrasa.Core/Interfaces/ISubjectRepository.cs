using QuamiMadrasa.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuamiMadrasa.Core.Interfaces
{
    public interface ISubjectRepository
    {
        Task<Subject> UpdateSubject(Subject Subject);
        Task<Subject> AddSubject(Subject Subject);
        Task<bool> DeleteSubject(int id);
        Task<List<Subject>> GetAllSubjects();
        Task<Subject> GetSubjectById(int id);
    }
}
