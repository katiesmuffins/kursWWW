using Microsoft.AspNetCore.Mvc;
using MvcExample.Models;
using MvcExample.Services;

namespace MvcExample.Controllers
{
    public class HomeController : Controller
    {
        private IPersonRepository _personRepository;

        public HomeController(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }

        public IActionResult Index(int page = 1)
        {
            var model = _personRepository.GetPage(page);
            ViewData["Title"] = "Lista osób";
            ViewBag.Title = "Lista osób";
            //return Content("Hello");
            //return new ObjectResult(model);
            return View(model);
        }

        public IActionResult Details(int id)
        {
            var model = _personRepository.GetById(id);
            ViewData["Title"] = model.FirstName + " " + model.LastName;
            return View(model);

        }
    }
}
