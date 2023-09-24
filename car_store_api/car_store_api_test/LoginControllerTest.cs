using car_store_api.Controllers;
using car_store_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace car_store_api_test
{
    public class Tokenjwt
    {
        public string token { get; set; }
    }

    public class LoginControllerTest
    {
        [Fact]
        public void CarStorage_GetById()
        {
            UnathorizedUser user1 = new UnathorizedUser
            {
                Name = "User",
                Password = "123",
            };
            var config = TestConfiguration.GetConfiguration();
            LoginController controller = new LoginController(config);

            var res = controller.Index(user1);
            // Request is Ok
            var okObjectResult = res as OkObjectResult;
            Assert.NotNull(okObjectResult);

            // Not null
            string token = okObjectResult.Value.ToString();
            token = token.Replace("{ token = ", "");
            token = token.Replace(" }", "");
            Assert.NotEmpty(token);

            // Check token
            var jwtSecurityToken = new JwtSecurityTokenHandler().ReadJwtToken(token);
            JwtPayload payload = jwtSecurityToken.Payload;
            Assert.NotNull(payload);
            Assert.NotNull(payload["exp"]);
            User user = new User()
            {
                Name = (string)payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                Role = (string)payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
            };
            Assert.Equal(user.Name, user1.Name);
        }
    }
}
