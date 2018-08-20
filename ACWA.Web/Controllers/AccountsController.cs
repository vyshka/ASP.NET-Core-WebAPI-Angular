using ACWA.Domain.Models;
using ACWA.Web.Authentication;
using ACWA.Web.Extensions;
using ACWA.Web.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ACWA.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<Profile> _userManager;
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;

        public AccountsController(UserManager<Profile> userManager, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions)
        {
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
        }

        // POST api/accounts
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Register model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Profile profile = new Profile
            {
                Email = model.Email,
                Data = model.Data,
                UserName = Guid.NewGuid().ToString().Replace("-", "").ToUpper()
            };
            var result = await _userManager.CreateAsync(profile, model.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
                return new BadRequestObjectResult(ModelState);
            }

            return new OkObjectResult("Account created");
        }

        // POST api/accounts/login
        [HttpPost("login")]
        public async Task<IActionResult> Post([FromBody]Login credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identity = await GetClaimsIdentity(credentials.Email, credentials.Password);
            if (identity == null)
            {
                ModelState.AddModelError("login_failure", "Invalid username or password");
                return BadRequest(ModelState);
            }

            var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, credentials.Email, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });
            return new OkObjectResult(jwt);
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                return await Task.FromResult<ClaimsIdentity>(null);
            }

            var userToVerify = await _userManager.FindByEmailAsync(email);
            if (userToVerify == null)
            {
                return await Task.FromResult<ClaimsIdentity>(null);
            }

            if (await _userManager.CheckPasswordAsync(userToVerify, password))
            {
                return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(email, userToVerify.Id));
            }

            return await Task.FromResult<ClaimsIdentity>(null);
        }
    }
}