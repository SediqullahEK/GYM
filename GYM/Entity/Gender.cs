using System.Collections.Generic;

#nullable disable

namespace GYM.Entity
{
    public partial class Gender
    {
        public Gender()
        {
            Athletes = new HashSet<Athlete>();
            staff = new HashSet<staff>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Athlete> Athletes { get; set; }
        public virtual ICollection<staff> staff { get; set; }
    }
}
