using Microsoft.AspNetCore.Identity;

namespace ACWA.Domain.Models
{
    public class Profile : IdentityUser
    {
        public string Data { get; set; }
    }
}
