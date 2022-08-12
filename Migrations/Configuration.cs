namespace chats.Migrations
{
    using chats.Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<chats.data.Context>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(chats.data.Context context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method
            //  to avoid creating duplicate seed data.
            List<Arme> Armes = new List<Arme>();
            Armes.Add(new Arme() { Id = 1, Nom = "Ibaraki", Degats = 5 });
            Armes.Add(new Arme() { Id = 2, Nom = "Hoshinawa", Degats = 6 });
            Armes.Add(new Arme() { Id = 3, Nom = "Susano", Degats = 10 });

            foreach (Arme arme in Armes)
            {
                context.Armes.Add(arme);
            }

            List<Samourai> Samourais = new List<Samourai>();
            Samourais.Add(new Samourai() { Id = 1, Force = 5, Nom = "Ikkaru", Arme = Armes[0] });
            Samourais.Add(new Samourai() { Id = 2, Force = 6, Nom = "Baaka", Arme = Armes[1] });
            Samourais.Add(new Samourai() { Id = 3, Force = 5, Nom = "Junoa", Arme = Armes[2] });
            
            foreach (Samourai sam in Samourais)
            {
                context.Samourais.Add(sam);
            }

            context.SaveChanges();
        }
    }
}
