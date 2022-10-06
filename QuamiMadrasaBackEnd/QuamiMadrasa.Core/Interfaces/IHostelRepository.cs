using QuamiMadrasa.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuamiMadrasa.Core.Interfaces
{
    public interface IHostelRepository
    {
        Task<Hostel> UpdateHostel(Hostel section);
        Task<Hostel> AddHostel(Hostel section);
        Task<bool> DeleteHostel(int id);
        Task<List<Hostel>> GetAllHostels();
        Task<Hostel> GetHostelById(int id);
    }
}
