using System;

#nullable disable

namespace GYM.Entity
{
    public partial class Athlete
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public int Gender { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string? Image { get; set; }
        public DateTime EntranceDate { get; set; }

        public virtual Gender GenderNavigation { get; set; }
    }
}
