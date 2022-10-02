using GYM.Entity;
using GYM.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Linq;

namespace GYM.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private readonly GYMDbContext _db;




        public HomeController(ILogger<HomeController> logger, GYMDbContext db)
        {
            _logger = logger;
            _db = db;

        }



        public IActionResult Index()
        {
            if (HttpContext.Session.GetString("Username") != null)
            {
                var query = (from i in _db.Athletes select i).ToList();
                var c = query.Count();
                ViewBag.totalAthletes = c;
                var query1 = (from i in _db.staff select i).ToList();
                var c1 = query1.Count();
                ViewBag.totalStaff = c1;
                var query2 = (from i in _db.Items select i).ToList();
                var c2 = query2.Count();
                ViewBag.totalItems = c2;

                return View();
            }
            else
            {
                return RedirectToAction("login");
            }
        }

        public IActionResult Registration()
        {

            var query = (from q in _db.Athletes select q).ToList();
            var g = (from s in _db.Genders select s).ToList();
            ViewBag.Ath = query;
            ViewBag.Gender = g;

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Registration(Athlete obj)
        {
            if (ModelState.IsValid)
            {
                _db.Athletes.Add(obj);
                _db.SaveChanges();
                return RedirectToAction("Registration");
            }
            else
            {


                return View();
            }
        }

        public IActionResult Finance()
        {
            return View();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
