﻿namespace car_store_api.Models
{
    public class User
    {
        public string Name { get; set; }
        public string Role { get; set; }
    }

    public class UnathorizedUser
    {
        public string Name { get; set; }
        public string Password { get; set; }
    }
}
