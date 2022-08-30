using Microsoft.AspNetCore.Identity;
using QuamiMadrasa.Application.ICustomServices;
using QuamiMadrasa.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuamiMadrasa.Application.CustomServices
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;

        public IUserRepository _userRepository { get; }

        public UserService(IUnitOfWork unitOfWork, IUserRepository userRepository)
        {
            _unitOfWork = unitOfWork;
            _userRepository = userRepository;
        }
        public async Task<IdentityRole<int>> AddRoleAsync(IdentityRole<int> role)
        {
            return await _userRepository.AddRoleAsync(role);
        }

        public async Task<IdentityUser<int>?> AuthenticateUser(string userName, string password)
        {
           return await _userRepository.AuthenticateUser(userName, password);
        }

        public async Task<List<IdentityRole<int>>> GetRolesAsync()
        {
            return await _userRepository.GetRolesAsync();
        }

        public async Task<IdentityUser<int>?> GetUserById(int id)
        {
            return await (_userRepository.GetUserById(id));
        }

        public async Task<List<IdentityRole<int>>> GetRolesByUserIdAsync(int userId)
        {
            return await _userRepository.GetRolesByUserIdAsync(userId);
        }
    }
}
