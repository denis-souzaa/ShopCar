using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using ShopCar.Domain.Entities;
using ShopCar.Domain.Interfaces.Repositories;
using ShopCar.Infra.Data.Context;
using ShopCar.Infra.Data.Util;

namespace ShopCar.Infra.Data.Repository
{
    public class RepositoryBase<T> : IRepository<T> where T : EntityBase
    {
        private readonly ShopCarContext _dbContext;
        private readonly Reflection _reflection = new Reflection();

        public RepositoryBase(ShopCarContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Commit()
        {
            _dbContext.SaveChanges();
        }

        public int Count<TColumn>(Expression<Func<T, TColumn>> whereColumn, object whereValue, params Expression<Func<T, object>>[] includes)
        {
            var query = _dbContext.Set<T>().AsNoTracking();

            if (includes.Length > 0)
            {
                query = includes.Aggregate(query, (current, inc) => current.Include(inc));
            }

            if (whereValue == null) return query.Count();

            query = query.Where(whereValue is string ? $"{_reflection.GetFullPropertyName(whereColumn)}.Contains(@0)" : $"{_reflection.GetFullPropertyName(whereColumn)}.Equals(@0)", whereValue);

            return query.Count();
        }

        public void Delete(int id)
        {
            var entity = _dbContext.Set<T>().FirstOrDefault(x => x.Id == id);
            
            _dbContext.Set<T>().Remove(entity ?? throw new InvalidOperationException());
            Commit();
        }

        public T Get(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            var query = _dbContext.Set<T>().AsNoTracking();

            if (predicate != null)
                query = query.Where(predicate);

            if (includes.Length <= 0) return query.FirstOrDefault();

            query = includes.Aggregate(query, (current, inc) => current.Include(inc));

            return query.FirstOrDefault();
        }

        public IList<T> GetAll<TColumn>(Expression<Func<T, TColumn>> whereColumn, object whereValue, string order, int skip = 0, int take = 10, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbContext.Set<T>().AsNoTracking();

            if(!string.IsNullOrWhiteSpace(order))
                query.OrderBy(order);

            if (includes.Length > 0)
            {
                query = includes.Aggregate(query, (current, inc) => current.Include(inc));
            }

            if (whereValue == null)
                return query.Skip(skip).Take(take).ToList();

            query = query.Where(whereValue is string ? $"{_reflection.GetFullPropertyName(whereColumn)}.Contains(@0)" : $"{_reflection.GetFullPropertyName(whereColumn)} == @0", whereValue);

            return query.Skip(skip).Take(take).ToList();
        }

        public T Insert(T obj)
        {
            _dbContext.Add(obj);
            Commit();

            return obj;
        }

        public T Update(T obj)
        {
            _dbContext.Update(obj);
            Commit();

            return obj;
        }
    }
}