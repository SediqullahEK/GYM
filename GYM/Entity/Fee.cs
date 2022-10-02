using System;

#nullable disable

namespace GYM.Entity
{
    public partial class Fee
    {
        public int Id { get; set; }
        public int AthName { get; set; }
        public int Fees { get; set; }
        public int Currency { get; set; }
        public bool Paid { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdateBy { get; set; }
    }
}
