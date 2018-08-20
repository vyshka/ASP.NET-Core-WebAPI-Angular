using System;

namespace ACWA.Services.TransportModels.User.Response
{
    public class UserEditResponse
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Login { get; set; }
        public string PhoneNumber { get; set; }
    }
}