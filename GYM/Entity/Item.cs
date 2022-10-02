using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace GYM.Entity
{
    public partial class Item
    {

        public int Id { get; set; }

        public long Barcode { get; set; }


        public string Name { get; set; }


        public int UnitPrice { get; set; }


        public int Currency { get; set; }

        public int? CreatedBy { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public int Category { get; set; }


        public int Quantity { get; set; }
        public string Image { get; set; }

        public virtual Category CategoryNavigation { get; set; }
        public virtual Currency CurrencyNavigation { get; set; }
    }
}
