#nullable disable


using System;
using System.Collections.Generic;

namespace GYM.Models
{
    public partial class SalesInfo
    {


        public int ID { get; set; }
        public string ItemName { get; set; }

        public int Quantity { get; set; }
        public int UnitPrice { get; set; }
        public int Total { get; set; }

        public static implicit operator List<object>(SalesInfo v)
        {
            throw new NotImplementedException();
        }
    }
}
