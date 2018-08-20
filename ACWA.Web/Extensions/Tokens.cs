using ACWA.Web.Authentication;
using ACWA.Web.Models;
using Newtonsoft.Json;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ACWA.Web.Extensions
{
    public class Tokens
    {
        public static async Task<string> GenerateJwt(ClaimsIdentity identity, IJwtFactory jwtFactory, string email, JwtIssuerOptions jwtOptions, JsonSerializerSettings serializerSettings)
        {
            var response = new
            {
                id = identity.Claims.Single(c => c.Type == "id").Value,
                auth_token = await jwtFactory.GenerateEncodedToken(email, identity),
                expires_in = (int)jwtOptions.ValidFor.TotalSeconds
            };
            return JsonConvert.SerializeObject(response, serializerSettings);
        }
    }
}