using System;

namespace ACWA.Services.TransportModels.User.Response
{
    public class UserResponse
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Login { get; set; }
        public string PhoneNumber { get; set; }
    }
}