using QuamiMadrasa.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuamiMadrasa.Core.Interfaces
{
    public interface IGuardianRepository
    {
        Task<Guardian> UpdateGuardian(Guardian Guardian);
        Task<Guardian> AddGuardian(Guardian Guardian);
        Task<bool> DeleteGuardian(int id);
        Task<List<Guardian>> GetAllGuardians();
        Task<Guardian> GetGuardianById(int id);
    }
}
