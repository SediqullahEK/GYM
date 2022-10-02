using GYM.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace GYM.Controllers
{
    public class LoginController : Controller
    {


        private readonly GYMDbContext DB;
        public LoginController(GYMDbContext db)
        {
            DB = db;
        }

        public IActionResult Login()
        {

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Login(User obj)
        {
            var x = (from s in DB.Users where obj.Username == s.Username && obj.Password == s.Password select s).SingleOrDefault();
            if (x != null)
            {
                HttpContext.Session.SetString("Username", x.Username);
                return RedirectToAction("index", "Home");

            }
            else
            {
                string msg = "Invalid Username or Password Entered!";
                ViewBag.msg = msg;

                return View();
            }
        }
        public IActionResult SignUp()
        {
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult SignUp(User user)
        {
            var users = (from q in DB.Users where q.Username == user.Username select q).ToList().Count();

            if (users > 0)
            {
                var msg = "Username already exists!!!";
                ViewBag.m = msg;
                return View();
            }
            else
            {
                ViewBag.m = "Successfully Signed Up";
                DB.Users.Add(user);
                DB.SaveChanges();

                return RedirectToAction("login");

            }
        }

    }
}
