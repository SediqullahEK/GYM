using GYM.Entity;
using GYM.Models;
using Microsoft.AspNetCore.Hosting;
using System;
using System.IO;


namespace GYM.BLL
{
    public class Inventory
    {
        private readonly GYMDbContext DB;
        private readonly IWebHostEnvironment WebHostEnvironment;
        public Inventory(GYMDbContext db, IWebHostEnvironment webHostEnvironment)
        {
            DB = db;
            WebHostEnvironment = webHostEnvironment;
        }

        public string UploadImage(ItemInfo item)
        {
            string fileName = null;
            if (item.Image != null)
            {
                string wwwRootPath = "C:/Users/A M C/source/repos/GYM/GYM/wwwroot";
                string filename = Path.GetFileNameWithoutExtension(item.ImageFile.FileName);
                filename = item.Name;
                string extension = Path.GetExtension(item.ImageFile.FileName);
                item.Image = filename = filename + DateTime.Now.ToString("yymmssff") + extension;
                string path = Path.Combine(wwwRootPath + "/Images/", filename);
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    item.ImageFile.CopyTo(fileStream);
                }

            }
            return fileName;
        }

    }
}

//string filename = Path.GetFileNameWithoutExtension(obj.imagefile.FileName);
//string extension = Path.GetExtension(obj.imagefile.FileName);
//obj.Photo = filename = filename + DateTime.Now.ToString("yymmssff") + extension;
//string path = Path.Combine(wwwRootPath + "/Images/", filename);
//using (var fileStream = new FileStream(path, FileMode.Create))
//{
//    obj.imagefile.CopyTo(fileStream);
//}
//Profile fobj = new Profile();
//fobj.FirstName = obj.FirstName;
//fobj.FatherName = obj.FatherName;
//fobj.Gender = obj.Gender;
//fobj.GenderId = obj.GenderId;
//fobj.LastName = obj.LastName;
//fobj.Phone = obj.Phone;
//fobj.Photo = obj.Photo;
//fobj.PhotoPath = obj.PhotoPath;
//_db.Profile.Add(fobj);
//_db.SaveChanges();