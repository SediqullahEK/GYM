using System;

#nullable disable

namespace GYM.Entity
{
    public partial class Sale
    {
        public int Id { get; set; }
        public long BarcodeId { get; set; }
        public int ItmName { get; set; }
        public DateTime Date { get; set; }
        public int Quantity { get; set; }
        public int SoldPrice { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public bool Status { get; set; }
    }
}
