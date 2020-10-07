using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Users.service.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int age { get; set; }
    }
}
