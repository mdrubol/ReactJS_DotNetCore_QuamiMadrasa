using QuamiMadrasa.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuamiMadrasa.Core.Interfaces
{
    public interface IHeadRepository
    {
        Task<Head> UpdateHead(Head Head);
        Task<Head> AddHead(Head Head);
        Task<bool> DeleteHead(int id);
        Task<List<Head>> GetAllHeads();
        Task<Head> GetHeadById(int id);
    }
}
