using System;
using System.Collections.Generic;
using car_store_api.Models;
using Microsoft.EntityFrameworkCore;

namespace car_store_api;

public partial class CarStoreDbContext : DbContext
{
    public CarStoreDbContext()
    {
    }

    public CarStoreDbContext(DbContextOptions<CarStoreDbContext> options)
        : base(options)
    {
    }

    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //    => optionsBuilder.UseSqlite("Data Source=CarStore.db;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    public virtual DbSet<Car> Cars { get; set; }
}
