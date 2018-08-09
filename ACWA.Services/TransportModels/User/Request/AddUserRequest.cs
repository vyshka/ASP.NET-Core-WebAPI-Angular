namespace ACWA.Services.TransportModels.User.Request
{
    public class AddUserRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Login { get; set; }
        public string PhoneNumber { get; set; }
    }
}