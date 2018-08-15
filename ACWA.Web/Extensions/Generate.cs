using ACWA.Services.TransportModels.User.Request;
using System;
using System.Collections.Generic;

namespace ACWA.Web.Extensions
{
    public class Generate
    {
        private readonly string[] fnames, lnames, logins;
        private readonly byte[] phoneCodes;

        public Generate()
        {
            fnames = new string[]
            {
                "Edgardo",
                "Dexter",
                "Alvin",
                "Forrest",
                "Garrett",
                "Leslie",
                "Charles",
                "Hank",
                "Michael",
                "Glen",
                "Elza",
                "Leota",
                "Shila",
                "Un",
                "Lahoma",
                "Nisha",
                "Wanda",
                "Wanita",
                "Kizzy",
                "Sheron"
            };

            lnames = new string[]
            {
                "Wollstonecraft",
                "Rickborn",
                "Frohock",
                "Groom",
                "Gupta",
                "Tanis",
                "Bradford",
                "Bolitho",
                "Lawler",
                "Rampichini",
                "Wyatt",
                "Badaracco",
                "Embrechts",
                "Corrigan",
                "Fixsen",
                "Maira",
                "Bertolino",
                "Loturco",
                "Noble",
                "Karsh"
            };

            logins = new string[]
            {
                "A1ntryslop",
                "BorgFoxKitty",
                "Claignav",
                "Coedensi",
                "Cohorli",
                "FelinePower",
                "Generalty",
                "Hagginci",
                "Kintelema",
                "LittleMc",
                "MaxMovieWithpain",
                "Melatelli",
                "Messagerrin",
                "MomFunny",
                "Noticeiver",
                "Reallyakne",
                "Roxentanonh",
                "Sakshiel",
                "Sendweed",
                "Shrubiz"
            };

            phoneCodes = new byte[]
            {
                24, 25, 29, 33, 44
            };
        }

        public List<AddUserRequest> GetUsers(int count)
        {
            List<AddUserRequest> users = new List<AddUserRequest>();
            Random random = new Random();
            for (int i = 0; i < count; i++)
            {
                users.Add(new AddUserRequest
                {
                    FirstName = fnames[random.Next(0, fnames.Length)],
                    LastName = lnames[random.Next(0, lnames.Length)],
                    Login = logins[random.Next(0, logins.Length)],
                    PhoneNumber = $"+375 ({phoneCodes[random.Next(0, phoneCodes.Length)]}) {random.Next(0, 10)}{random.Next(0, 10)}{random.Next(0, 10)}-{random.Next(0, 10)}{random.Next(0, 10)}-{random.Next(0, 10)}{random.Next(0, 10)}"
                });
            }
            return users;
        }
    }
}
