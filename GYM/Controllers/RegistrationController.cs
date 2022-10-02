using GYM.Entity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace GYM.Controllers
{
    public class RegistrationController : Controller
    {
        private readonly GYMDbContext DB;
        public RegistrationController(GYMDbContext db)
        {
            DB = db;
        }

        public IActionResult ShowAth()
        {

            var query = (from q in DB.Athletes select q).ToList();
            var g = (from s in DB.Genders select s).ToList();
            query = query.OrderBy(o => o.Id).ToList();
            ViewBag.Athlete = query;
            ViewBag.gender = g;

            return View();
        }

        public IActionResult addAth()
        {

            return View();

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult addAth(Athlete obj)
        {
            DB.Athletes.Add(obj);
            DB.SaveChanges();
            return RedirectToAction("Registration", "Home");
        }

        public IActionResult deletAth(int id)
        {
            var query = (from q in DB.Athletes where q.Id == id select q).SingleOrDefault();
            DB.Athletes.Remove(query);
            DB.SaveChanges();
            return RedirectToAction("Registration");
        }


        public IActionResult editAth(int id)
        {
            if (id == null || id == 0)
            {
                return NotFound();
            }
            var obj = DB.Athletes.Find(id);
            if (obj == null)
            {
                return NotFound();
            }

            return View(obj);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult editAth(Athlete obj)
        {
            DB.Athletes.Update(obj);
            DB.SaveChanges();
            return RedirectToAction("Registration", "Home");
        }
        public IActionResult ShowStaff()
        {

            return View();
        }
        //add Staff GET
        public IActionResult AddOrEditStaff()
        {
            return View();
        }

    }
}
