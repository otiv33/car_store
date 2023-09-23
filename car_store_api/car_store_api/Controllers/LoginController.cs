using car_store_api.Auth;
using car_store_api.Models;
using Microsoft.AspNetCore.Mvc;
using car_store_api.Exceptions;
using Microsoft.AspNetCore.Authorization;

namespace car_store_api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        IConfiguration _configuration;
        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [AllowAnonymous]
        public string Index([FromBody] UnathorizedUser user)
        {
            if (user.Name == "User" && user.Password == "123"){
                var service = new JwtService(_configuration);
                string token = service.GenerateToken(user.Name, "User");
                return token;
            }
            else
            {
                throw new InvalidCredentialsException("User credentials are false");
            }
        }
    }
}
