using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace chats.Models
{
    public class Chat
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public int Age { get; set; }
        public string Couleur { get; set; }


        private static List<Chat> lstCats = new List<Chat>()
        {
                new Chat { Id = 1, Nom = "Felix", Age = 3, Couleur = "Roux" },
                new Chat { Id = 2, Nom = "Minette", Age = 1, Couleur = "Noire"},
                new Chat { Id = 3, Nom = "Miss", Age = 10, Couleur = "Blanche" },
                new Chat { Id = 4, Nom = "Garfield", Age = 6, Couleur = "Gris" },
                new Chat { Id = 5, Nom = "Chatran", Age = 4, Couleur = "Fauve" },
                new Chat { Id = 6, Nom = "Minou", Age = 2, Couleur = "Blanc" },
                new Chat { Id = 7, Nom = "Bichette", Age = 12, Couleur = "Rousse" }
        };

        public static List<Chat> getLstCats()
        {
            return lstCats;
        }

        public static Chat getCatById(int id)
        {
            var chat = lstCats.FirstOrDefault(a => a.Id==id);
            return chat;
        }

    }
}