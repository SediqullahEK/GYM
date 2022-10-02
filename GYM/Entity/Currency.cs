using System.Collections.Generic;

#nullable disable

namespace GYM.Entity
{
    public partial class Currency
    {
        public Currency()
        {
            Items = new HashSet<Item>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Item> Items { get; set; }
    }
}
