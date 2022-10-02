#nullable disable

using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace GYM.Models
{
    public partial class ItemInfo
    {

        public int ID { get; set; }
        public long Barcode { get; set; }


        public string Name { get; set; }


        public int UnitPrice { get; set; }


        public int Currency { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }



        public int Category { get; set; }


        public int Quantity { get; set; }

        public string Image { get; set; }

    }
}
