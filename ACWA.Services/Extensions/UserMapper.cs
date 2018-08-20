using ACWA.Domain.Models;
using ACWA.Services.TransportModels.User.Request;
using ACWA.Services.TransportModels.User.Response;
using System;
using System.Collections.Generic;

namespace ACWA.Services.Extensions
{
    public static class UserMapper
    {
        public static UserResponse ToUserResponse(this User model)
        {
            return new UserResponse()
            {
                Id = model.Id,
                FullName = model.FullName,
                Login = model.Login,
                PhoneNumber = model.PhoneNumber
            };
        }

        public static UserEditResponse ToUserEditResponse(this User model)
        {
            return new UserEditResponse()
            {
                Id = model.Id,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Login = model.Login,
                PhoneNumber = model.PhoneNumber
            };
        }

        public static List<UserResponse> ToUserResponseList(this List<User> models)
        {
            List<UserResponse> userResponsesList = new List<UserResponse>();
            foreach (var model in models)
            {
                userResponsesList.Add(model.ToUserResponse());
            }
            return userResponsesList;
        }

        public static User ToUser(this AddUserRequest model)
        {
            return new User
            {
                Id = Guid.NewGuid(),
                FirstName = model.FirstName,
                LastName = model.LastName,
                Login = model.Login,
                PhoneNumber = model.PhoneNumber
            };
        }

        public static User ToUser(this UpdateUserRequest model)
        {
            return new User
            {
                Id = model.Id,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Login = model.Login,
                PhoneNumber = model.PhoneNumber
            };
        }
    }
}