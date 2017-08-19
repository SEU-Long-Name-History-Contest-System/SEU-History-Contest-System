using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using HistoryContest.Server.Models.Entities;
using System.Threading.Tasks;

namespace HistoryContest.Server.Data.Repositories
{
    public class GenericRepository<TEntity> where TEntity : class
    {
        internal ContestContext context;
        internal DbSet<TEntity> dbSet;

        public GenericRepository(ContestContext context)
        {
            this.context = context;
            dbSet = context.Set<TEntity>();
        }

        #region Synchronous Methods
        public int Size()
        {
            return dbSet.Count();
        }

        public virtual IEnumerable<TEntity> Get(
            Expression<Func<TEntity, bool> > filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity> > orderBy = null,
            string includeProperties = "")
        {
            IQueryable<TEntity> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }

        public virtual TEntity GetByID(object id)
        {
            return dbSet.Find(id);
        }

        public virtual TEntity FirstOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return dbSet.FirstOrDefault(predicate);
        }

        public virtual void Insert(TEntity entity)
        {
            dbSet.Add(entity);
        }

        public virtual void Delete(object id)
        {
            TEntity entityToDelete = dbSet.Find(id);
            Delete(entityToDelete);
        }

        public virtual void Delete(TEntity entityToDelete)
        {
            if (context.Entry(entityToDelete).State == EntityState.Detached)
            {
                dbSet.Attach(entityToDelete);
            }
            dbSet.Remove(entityToDelete);
        }

        public virtual void Update(TEntity entityToUpdate)
        {
            dbSet.Attach(entityToUpdate);
            context.Entry(entityToUpdate).State = EntityState.Modified;
        }
        #endregion

        #region Asynchronous Methods
        public async Task<int> SizeAsync()
        {
            return await dbSet.CountAsync();
        }

        public async virtual Task<IEnumerable<TEntity>> GetAsync(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<TEntity> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return await orderBy(query).ToListAsync();
            }
            else
            {
                return await query.ToListAsync();
            }
        }

        public async virtual Task<TEntity> GetByIDAsync(object id)
        {
            return await dbSet.FindAsync(id);
        }

        public async virtual Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await dbSet.FirstOrDefaultAsync(predicate);
        }

        public async virtual Task InsertAsync(TEntity entity)
        {
            await dbSet.AddAsync(entity);
        }

        public async virtual Task DeleteAsync(object id)
        {
            TEntity entityToDelete = await dbSet.FindAsync(id);
            Delete(entityToDelete);
        }
        #endregion
    }
}
