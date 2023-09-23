using System.ComponentModel.DataAnnotations;

namespace car_store_api.Models
{
    public class Car
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
        public int Year { get; set; }

        [Required(ErrorMessage = "Color is required")]
        public string Color { get; set; }

        [Range(1, 100000, ErrorMessage = "Price must be between $1 and $100000")]
        public double Price { get; set; }
        public DateTime SaleDate { get; set; }
    }
}
