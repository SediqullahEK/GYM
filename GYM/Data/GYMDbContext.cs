using Microsoft.EntityFrameworkCore;

#nullable disable

namespace GYM.Entity
{
    public partial class GYMDbContext : DbContext
    {
        public GYMDbContext()
        {
        }

        public GYMDbContext(DbContextOptions<GYMDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Athlete> Athletes { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Currency> Currencies { get; set; }
        public virtual DbSet<Fee> Fees { get; set; }
        public virtual DbSet<Gender> Genders { get; set; }
        public virtual DbSet<Item> Items { get; set; }
        public virtual DbSet<Position> Positions { get; set; }
        public virtual DbSet<Salary> Salaries { get; set; }
        public virtual DbSet<Sale> Sales { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<staff> staff { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseNpgsql("server=localhost; Database=GYM; Username=postgres; Password=admin; ");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "English_United States.1252");

            modelBuilder.Entity<Athlete>(entity =>
            {
                entity.ToTable("Athlete", "prof");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("nextval('prof.ath_id_seq'::regclass)");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(64);

                entity.Property(e => e.CreatedOn).HasColumnType("date");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(60);

                entity.Property(e => e.EntranceDate)
                    .HasColumnType("date")
                    .HasColumnName("Entrance Date");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasMaxLength(13);

                entity.Property(e => e.UpdatedBy).HasMaxLength(50);

                entity.Property(e => e.UpdatedOn).HasColumnType("date");

                entity.HasOne(d => d.GenderNavigation)
                    .WithMany(p => p.Athletes)
                    .HasForeignKey(d => d.Gender)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Gen_fk");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category", "look");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("nextval('look.category_id_seq'::regclass)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Currency>(entity =>
            {
                entity.ToTable("Currency", "look");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("nextval('look.currency_id_seq'::regclass)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(3);
            });

            modelBuilder.Entity<Fee>(entity =>
            {
                entity.ToTable("Fees", "fin");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("nextval('fin.fees_id_seq'::regclass)");

                entity.Property(e => e.CreatedOn).HasColumnType("date");

                entity.Property(e => e.UpdateBy).HasColumnType("character varying");

                entity.Property(e => e.UpdatedOn).HasColumnType("date");
            });

            modelBuilder.Entity<Gender>(entity =>
            {
                entity.ToTable("Gender", "look");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("nextval('look.gender_id_seq'::regclass)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(7);
            });

            modelBuilder.Entity<Item>(entity =>
            {
                entity.ToTable("Item", "fin");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("nextval('fin.item_id_seq'::regclass)");

                entity.Property(e => e.CreatedOn).HasColumnType("date");

                entity.Property(e => e.Image).HasMaxLength(60);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.UnitPrice).HasColumnName("UnitPrice");

                entity.Property(e => e.UpdatedBy).HasMaxLength(50);

                entity.Property(e => e.UpdatedOn).HasColumnType("date");

                entity.HasOne(d => d.CategoryNavigation)
                    .WithMany(p => p.Items)
                    .HasForeignKey(d => d.Category)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ctg_fk");

                entity.HasOne(d => d.CurrencyNavigation)
                    .WithMany(p => p.Items)
                    .HasForeignKey(d => d.Currency)
                    .HasConstraintName("C_Fk");
            });

            modelBuilder.Entity<Position>(entity =>
            {
                entity.ToTable("Position", "look");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("nextval('look.sposition_id_seq'::regclass)");

                entity.Property(e => e.Name).HasMaxLength(30);
            });

            modelBuilder.Entity<Salary>(entity =>
            {
                entity.ToTable("Salary", "fin");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("nextval('fin.salary_id_seq'::regclass)");

                entity.Property(e => e.CreatedOn).HasColumnType("date");

                entity.Property(e => e.Salary1).HasColumnName("Salary");

                entity.Property(e => e.UpdatedBy).HasMaxLength(50);

                entity.Property(e => e.UpdatedOn).HasColumnType("date");

                entity.HasOne(d => d.StfNameNavigation)
                    .WithMany(p => p.Salaries)
                    .HasForeignKey(d => d.StfName)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fee_fk");
            });

            modelBuilder.Entity<Sale>(entity =>
            {
                entity.ToTable("Sales", "fin");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("nextval('fin.sales_id_seq'::regclass)");

                entity.Property(e => e.BarcodeId).HasColumnName("BarcodeID");

                entity.Property(e => e.CreatedOn).HasColumnType("date");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasDefaultValueSql("CURRENT_DATE");

                entity.Property(e => e.UpdatedBy).HasMaxLength(50);

                entity.Property(e => e.UpdatedOn).HasColumnType("date");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User", "prof");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("nextval('prof.user_id_seq'::regclass)");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<staff>(entity =>
            {
                entity.ToTable("Staff", "prof");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasDefaultValueSql("nextval('prof.stf_id_seq'::regclass)");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(64);

                entity.Property(e => e.CreatedOn).HasColumnType("date");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(60);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasMaxLength(13);

                entity.Property(e => e.UpdatedBy).HasMaxLength(50);

                entity.Property(e => e.UpdatedOn).HasColumnType("date");

                entity.HasOne(d => d.GenderNavigation)
                    .WithMany(p => p.staff)
                    .HasForeignKey(d => d.Gender)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Gen_fk");

                entity.HasOne(d => d.PositionNavigation)
                    .WithMany(p => p.staff)
                    .HasForeignKey(d => d.Position)
                    .HasConstraintName("ps_fk");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
