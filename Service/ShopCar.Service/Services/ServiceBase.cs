using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using ShopCar.Domain.Entities;
using ShopCar.Domain.Interfaces.Repositories;
using ShopCar.Domain.Interfaces.Services;

namespace ShopCar.Service.Services
{
    public class ServiceBase<T> : IService<T> where T : EntityBase
    {
        private readonly IRepository<T> _repository;
        public ServiceBase(IRepository<T> repository)
        {
            _repository = repository;
        }
        public void Commit()
        {
            _repository.Commit();
        }

        public int Count(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            return _repository.Count(predicate, includes);
        }

        public void Delete(int id)
        {
            _repository.Delete(id);
        }

        public T Get(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            return _repository.Get(predicate,includes);
        }

        public IList<T> GetAll(Expression<Func<T, bool>> predicate, string order, int skip = 0, int take = 10, params Expression<Func<T, object>>[] includes)
        {
            return _repository.GetAll(predicate, order,skip,take,includes);
        }

        public T Insert(T obj)
        {
            return _repository.Insert(obj);
        }

        public T Update(T obj)
        {
            return _repository.Update(obj);
        }
    }
}