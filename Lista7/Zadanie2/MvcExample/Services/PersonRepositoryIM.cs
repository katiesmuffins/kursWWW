using MvcExample.Models;
using System.Collections.Generic;

namespace MvcExample.Services
{
    public interface IPersonRepository
    {
        IEnumerable<Person> GetPage(int page);
        Person GetById(int id);
    }
    public class PersonRepositoryIM : IPersonRepository
    {
        List<Person> _persons;
        int pageSize = 2;

        public PersonRepositoryIM()
        {
            _persons = new List<Person>
            {
                new Person { Id = 1, FirstName = "Jan", LastName = "Kowalski", Address = "ul. Trawiasta 10" },
                new Person { Id = 2, FirstName = "Agata", LastName = "Zielony", Address = "ul. Koszykowa 12" },
                new Person { Id = 3, FirstName = "Ewa", LastName = "Szumska", Address = "ul. Zaciszna 3" },
                new Person { Id = 4, FirstName = "Kasia", LastName = "Iwankiewicz", Address = "ul. Bajkowa 1"},
                new Person { Id = 5, FirstName = "Wojtek", LastName = "Mik", Address = "ul. Nowa 3"},
                new Person { Id = 6, FirstName = "Ania", LastName = "Goś", Address = "ul. Nożownicza 1"}

            };
        }

        public Person GetById(int id)
        {
            foreach (var p in _persons)
                if (p.Id == id)
                    return p;
            return null;
        }
        public IEnumerable<Person> GetPage(int page)
        {
            var first = (page - 1) * pageSize;

            return _persons.GetRange(first, pageSize);
        }
    }
}
