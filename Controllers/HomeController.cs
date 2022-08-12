using chats.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace chats.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var model = Chat.getLstCats();
            return View(model);
        }

        [HttpGet]
        [Route("catDetails")]
        public ActionResult catDetails(int id)
        {
            var model = Chat.getCatById(id);
            return Json(model, JsonRequestBehavior.AllowGet);
        }


        private static Pizza pizz;
        public Pizza Pizz => pizz ?? (pizz = new Pizza());

        public ActionResult PizzaHome()
        {
            var model = Pizz.PizzasDisponibles;
            return View(model);
        }

        [HttpGet]
        [Route("pizzaIngredientPate")]
        public ActionResult pizzaIngredientPate()
        {
            var model = Pizza.getIngredientPate();
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("getPizzaById")]
        public ActionResult getPizzaById(int id)
        {
            var model = Pizz.getPizzaById(id);
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Route("registerNewPizza")]
        public ActionResult registerNewPizza(Pizza newPizza)
        {
            if (newPizza.Id == 0)
            {
                Pizz.addPizza(newPizza);
            }
            else
            {
                Pizz.updatePizza(newPizza);
            }
            var model = Pizz.PizzasDisponibles;
            return Json(model, JsonRequestBehavior.AllowGet);
        }

    }
}