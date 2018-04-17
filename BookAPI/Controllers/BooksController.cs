using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using BookAPI.Models;
using BookAPI.DTOs;

namespace BookAPI.Controllers
{
    public class BooksController : ApiController
    {
        private BookAPIContext db = new BookAPIContext();

        //Typed lambda expression for Select() method.
        private static readonly Expression<Func<Book, BookDto>> AsBookDto = x => new BookDto
        {
            Title = x.Title,
            Author = x.Author.AuthorName,
            Genre = x.Genre
        };

        // GET: api/Books
        public IQueryable<BookDto> GetBooks()
        {
            return db.Books.Include(b => b.Author).Select(AsBookDto);
        }

        // GET: api/Books/5
        [ResponseType(typeof(BookDto))]
        public async Task<IHttpActionResult> GetBook(int id)
        {
            BookDto book = await db.Books.Include(b => b.Author)
                 .Where(b => b.BookId == id)
                 .Select(AsBookDto)
                 .FirstOrDefaultAsync();
            if (book ==null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }

        //private bool BookExists(int id)
        //{
        //    return db.Books.Count(e => e.BookId == id) > 0;
        //}
    }
}