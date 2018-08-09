using ACWA.Services.Interfaces;
using ACWA.Services.TransportModels.User.Request;
using ACWA.Services.TransportModels.User.Response;
using ACWA.Web.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace ACWA.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/users
        [HttpGet]
        public async Task<PaginationHelper<UserResponse>> GetUsers([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var totalCount = await _userService.GetUsersCountAsync();

            var skipAmount = pageSize * (page - 1);
            var mod = totalCount % pageSize;
            var totalPageCount = (totalCount / pageSize) + (mod == 0 ? 0 : 1);

            var users = await _userService.GetAllUsersAsync(skipAmount, pageSize);

            return new PaginationHelper<UserResponse>
            {
                Entities = users,
                PageNumber = page,
                PageSize = pageSize,
                TotalPages = totalPageCount
            };
        }

        // GET: api/users/id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userService.GetUserByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/users/update
        [HttpPut("{update}")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            try
            {
                await _userService.UpdateUserAsync(model);
            }
            catch (Exception exp)
            {
                return BadRequest(exp);
            }

            return NoContent();
        }

        // POST: api/users/add
        [HttpPost("{add}")]
        public async Task<IActionResult> AddUser([FromBody] AddUserRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _userService.AddUserAsync(model);
            }
            catch (Exception exp)
            {
                return BadRequest(exp);
            }

            return NoContent();
        }

        // DELETE: api/users/delete
        [HttpDelete("{delete}")]
        public async Task<IActionResult> DeleteUser([FromRoute] Guid id)
        {
            try
            {
                await _userService.DeleteUserAsync(id);
            }
            catch (Exception exp)
            {
                return BadRequest(exp);
            }

            return NoContent();
        }
    }
}