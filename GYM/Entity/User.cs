#nullable disable

using System.ComponentModel.DataAnnotations;

namespace GYM.Entity
{
    public partial class User
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "*")]
        public string Username { get; set; }

        [Required(ErrorMessage = "*")]
        public string Password { get; set; }
    }
}
