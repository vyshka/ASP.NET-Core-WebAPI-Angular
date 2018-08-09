using ACWA.Services.TransportModels.User.Request;
using ACWA.Services.TransportModels.User.Response;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ACWA.Services.Interfaces
{
    public interface IUserService
    {
        Task AddUserAsync(AddUserRequest model);
        Task DeleteUserAsync(Guid id);
        Task<List<UserResponse>> GetAllUsersAsync(int? skip = null, int? take = null);
        Task<UserResponse> GetUserByIdAsync(Guid id);
        Task<int> GetUsersCountAsync();
        Task UpdateUserAsync(UpdateUserRequest model);
    }
}