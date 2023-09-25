using Microsoft.AspNetCore.Authentication;

namespace car_store_api.Auth
{
    public class AuthHandler : IAuthenticationHandler
    {
        HttpContext _context;
        public Task<AuthenticateResult> AuthenticateAsync()
        {
            throw new NotImplementedException();
        }

        public Task InitializeAsync(AuthenticationScheme scheme, HttpContext context)
        {
            _context = context;
            return Task.CompletedTask;
        }

        public Task ChallengeAsync(AuthenticationProperties? properties)
        {
            _context.Response.StatusCode = 401;
            return Task.CompletedTask;
        }

        public Task ForbidAsync(AuthenticationProperties? properties)
        {
            _context.Response.StatusCode = 403;
            return Task.CompletedTask;
        }
    }
}
