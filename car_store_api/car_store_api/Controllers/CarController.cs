using car_store_api.Auth;
using car_store_api.Models;
using car_store_api.Storage;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("[controller]")]
[ApiController]
[AuthorizeRequest("User", "Admin")]
public class CarController : ControllerBase
{
    private IStorage<Car> _carStorage;
    public CarController(IStorage<Car> carStorage) {
        _carStorage = carStorage;
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var res = _carStorage.GetById(id);
        if (res == null)
            return NotFound();

        return Ok(res);
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        bool success = int.TryParse(Request.Query["pageSize"], out int pageSize);
        if (!success)
            pageSize = 3;
        success = int.TryParse(Request.Query["pageNumber"], out int pageNumber);
        if (!success)
            pageNumber = 1;

        var res = _carStorage.GetAll(pageSize, pageNumber);
        return Ok(res);
    }

    [HttpPost]
    public IActionResult Insert([FromBody] Car car)
    {
        var res = _carStorage.Insert(car);
        return Ok(res);
    }

    [HttpPut]
    public IActionResult UpdateById([FromBody] Car car)
    {
        var res = _carStorage.Update(car);
        return Ok(res);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteById(int id)
    {
        var res = _carStorage.DeleteById(id);
        return Ok(res);
    }
}
