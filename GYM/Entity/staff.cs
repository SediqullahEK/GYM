using System;
using System.Collections.Generic;

#nullable disable

namespace GYM.Entity
{
    public partial class staff
    {
        public staff()
        {
            Salaries = new HashSet<Salary>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public int Gender { get; set; }
        public int? Position { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public string Image { get; set; }
        public DateTime UpdatedOn { get; set; }

        public virtual Gender GenderNavigation { get; set; }
        public virtual Position PositionNavigation { get; set; }
        public virtual ICollection<Salary> Salaries { get; set; }
    }
}
