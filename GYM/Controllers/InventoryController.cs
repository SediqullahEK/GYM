using GYM.BLL;
using GYM.Entity;
using GYM.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
namespace GYM.Controllers
{
    public class InventoryController : Controller
    {


        // our database object
        private readonly GYMDbContext DB;
        private readonly IWebHostEnvironment _hostEnvironment;
        private static Inventory inv;
        public InventoryController(GYMDbContext db, IWebHostEnvironment hostEnvironment)
        {
            DB = db;
            this._hostEnvironment = hostEnvironment;
        }


        //Items GET
        public IActionResult ShowItems()
        {

            var query = (from q in DB.Items select q).ToList();

            var Cg = (from c in DB.Categories select c).ToList();

            var g = (from s in DB.Currencies select s).ToList();

            ViewBag.Items = query;
            ViewBag.Category = Cg;
            ViewBag.Currency = g;

            ViewBag.count = query.Count;
            //    List<Item> ItemList = DB.Items.ToList<Item>();

            //      return Json(ItemList, JsonRequestBehavior.AllowGet);
            return View();

        }

        [HttpGet]
        public IActionResult AddToStock()
        {
            Item itm = new Item();

            return View(itm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult AddToStock([FromBody] ItemInfo itm)
        {
            Item item = new Item();
            string stringFileName = inv.UploadImage(itm);
            item.Barcode = itm.Barcode;
            item.Name = itm.Name;
            item.UnitPrice = itm.UnitPrice;
            item.Currency = itm.Currency;
            item.Category = itm.Category;
            item.Quantity = itm.Quantity;
            item.Image = stringFileName;
            item.CreatedOn = System.DateTime.Now;
            DB.Items.Add(item);
            var res = DB.SaveChanges();
            return Ok(itm);
        }



        [HttpGet]
        public IActionResult GetItem([FromQuery(Name = "ID")] int ID)
        {
            var record = DB.Items.Where(e => e.Id == ID)
                .Select(e => new
                {
                    e.Id,
                    e.Name,
                    e.Barcode,
                    e.Currency,
                    e.Category,
                    e.Quantity,
                    e.UnitPrice
                }).SingleOrDefault();

            return Ok(record);
        }

        [HttpGet]
        public IActionResult GetItems()
        {
            List<Item> items = DB.Items.Select(e => e).ToList();

            return Ok(items);
        }

        [HttpGet]
        public IActionResult EditItem()
        {
            Item itm = new Item();

            return Ok(itm);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult EditItem([FromBody] ItemInfo itm)
        {
            var query = (from q in DB.Items where q.Id == itm.ID select q).SingleOrDefault();
            query.Id = itm.ID;
            query.Name = itm.Name;
            query.UnitPrice = itm.UnitPrice;
            query.Currency = itm.Currency;
            query.Quantity = itm.Quantity;
            query.Category = itm.Category;
            query.CreatedOn = System.DateTime.Now;

            DB.Items.Update(query);
            var res = DB.SaveChanges();

            return Ok(itm);
        }

        //GET for Del
        public IActionResult DeleteItem(int id)
        {
            if (id > 0)
            {
                Item itm = DB.Items.Find(id);

                DB.Remove(itm);
                DB.SaveChanges();

                return Ok(itm);
            }
            return Ok();
        }



        //GET for 
        public IActionResult OnCart()
        {


            return View();
        }
        //add Staff GET

        public IActionResult AddOrEditCart(int id)
        {
            if (id == null || id == 0)
            {
                return NotFound();
            }
            var obj = DB.Sales.Find(id);
            if (obj == null)
            {
                return NotFound();
            }

            return View(obj);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult AddOrEditCart(Sale obj)
        {
            DB.Sales.Add(obj);
            DB.SaveChanges();
            return RedirectToAction("SoldList");
        }





        public IActionResult Inventory()
        {
            return View();
        }

        [HttpPost]
        [AutoValidateAntiforgeryToken]

        public IActionResult Inventory(Sale obj)
        {

            DB.Sales.Add(obj);
            DB.SaveChanges();
            return View();

        }


    }
}

