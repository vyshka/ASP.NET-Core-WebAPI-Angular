﻿using System.Security.Claims;
using System.Threading.Tasks;

namespace ACWA.Web.Authentication
{
    public interface IJwtFactory
    {
        Task<string> GenerateEncodedToken(string email, ClaimsIdentity identity);
        ClaimsIdentity GenerateClaimsIdentity(string email, string id);
    }
}