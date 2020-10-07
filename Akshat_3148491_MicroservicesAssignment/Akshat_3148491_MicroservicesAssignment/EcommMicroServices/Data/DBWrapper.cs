using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Users.service.Models;

namespace Users.service.Data
{
    public class DBWrapper
    {
        private string _dataFile;
        private UserList _data;
        public DBWrapper()
        {
            string jsonString = System.IO.File.ReadAllText("Data/UserData.json");
            _data = JsonConvert.DeserializeObject<UserList>(jsonString);
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _data.userList;
        }

        public User GetUser(string name)
        {
            try
            {
                return _data.userList.Where((u) => u.Name.Equals(name)).FirstOrDefault();
            }
            catch(Exception ex)
            {
                return 
            }
        }
    }
}
