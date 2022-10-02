using System;

#nullable disable

namespace GYM.Entity
{
    public partial class Salary
    {
        public int Id { get; set; }
        public int StfName { get; set; }
        public int Salary1 { get; set; }
        public int Currency { get; set; }
        public bool Paid { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }

        public virtual staff StfNameNavigation { get; set; }
    }
}
