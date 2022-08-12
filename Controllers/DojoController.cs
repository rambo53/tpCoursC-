using chats.data;
using chats.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace chats.Controllers
{
    public class DojoController : Controller
    {
        private Context context = new Context();
        // GET: Dojo
        public ActionResult DojoHome()
        {
            return View();
        }

        [HttpGet]
        [Route("GetSamourais")]
        public ActionResult GetSamourais()
        {
            var model = context.Samourais.ToList();
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("getSamouraiById")]
        public ActionResult getSamouraiById(int id)
        {
            var model = context.Samourais.Find(id);
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("deleteSamourai")]
        public ActionResult deleteSamourai(int id)
        {
            var samourai = context.Samourais.Find(id);
            context.Samourais.Remove(samourai);
            context.SaveChanges();
            var model = context.Samourais.ToList();
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Route("saveSamourai")]
        public ActionResult saveSamourai(Samourai samourai)
        {
            if(samourai.Id > 0)
            {
                context.Entry(samourai).State = System.Data.Entity.EntityState.Modified;
                context.SaveChanges();
            }
            else
            {
                context.Entry(samourai).State = System.Data.Entity.EntityState.Added;
                context.SaveChanges();
            }
            var model = context.Samourais.ToList();
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("GetArmes")]
        public ActionResult GetArmes()
        {
            var model = context.Armes.ToList();
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("getArmeById")]
        public ActionResult getArmeById(int id)
        {
            var model = context.Armes.Find(id);
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("deleteArme")]
        public ActionResult deleteArme(int id)
        {
            var arme = context.Armes.Find(id);
            context.Armes.Remove(arme);
            context.SaveChanges();
            var model = context.Armes.ToList();
            return Json(model, JsonRequestBehavior.AllowGet);
        }
    }
}