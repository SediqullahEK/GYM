using Microsoft.AspNetCore.Mvc;

namespace GYM.Controllers
{
    public class FinanceController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
