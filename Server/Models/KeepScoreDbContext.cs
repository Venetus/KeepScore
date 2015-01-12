using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Server.Models
{
    public class KeepScoreDbContext: DbContext
    {
        public DbSet<SimpleGame> SimpleGames { get; set; }
    }
}