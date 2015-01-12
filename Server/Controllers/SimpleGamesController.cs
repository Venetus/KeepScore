using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Server.Models;

namespace Server.Controllers
{
    public class SimpleGamesController : ApiController
    {
        private KeepScoreDbContext db = new KeepScoreDbContext();

        // GET: api/SimpleGames
        public IQueryable<SimpleGame> GetSimpleGames()
        {
            return db.SimpleGames;
        }

        // GET: api/SimpleGames/5
        [ResponseType(typeof(SimpleGame))]
        public async Task<IHttpActionResult> GetSimpleGame(int id)
        {
            SimpleGame simpleGame = await db.SimpleGames.FindAsync(id);
            if (simpleGame == null)
            {
                return NotFound();
            }

            return Ok(simpleGame);
        }

        // PUT: api/SimpleGames/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutSimpleGame(int id, SimpleGame simpleGame)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != simpleGame.Id)
            {
                return BadRequest();
            }

            db.Entry(simpleGame).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SimpleGameExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/SimpleGames
        [ResponseType(typeof(SimpleGame))]
        public async Task<IHttpActionResult> PostSimpleGame(SimpleGame simpleGame)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.SimpleGames.Add(simpleGame);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = simpleGame.Id }, simpleGame);
        }

        // DELETE: api/SimpleGames/5
        [ResponseType(typeof(SimpleGame))]
        public async Task<IHttpActionResult> DeleteSimpleGame(int id)
        {
            SimpleGame simpleGame = await db.SimpleGames.FindAsync(id);
            if (simpleGame == null)
            {
                return NotFound();
            }

            db.SimpleGames.Remove(simpleGame);
            await db.SaveChangesAsync();

            return Ok(simpleGame);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SimpleGameExists(int id)
        {
            return db.SimpleGames.Count(e => e.Id == id) > 0;
        }
    }
}