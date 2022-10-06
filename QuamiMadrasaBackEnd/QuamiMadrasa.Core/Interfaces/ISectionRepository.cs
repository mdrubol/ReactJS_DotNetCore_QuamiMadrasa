using QuamiMadrasa.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuamiMadrasa.Core.Interfaces
{
    public interface ISectionRepository
    {
        Task<Section> UpdateSection(Section section);
        Task<Section> AddSection(Section section);
        Task<bool> DeleteSection(int id);
        Task<List<Section>> GetAllSections();
        Task<Section> GetSectionById(int id);
    }
}
