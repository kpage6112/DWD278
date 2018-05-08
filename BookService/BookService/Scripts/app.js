var ViewModel = function () {
    var self = this;
    self.books = ko.observableArray();
    self.error = ko.observable();
    self.detail = ko.observable();
    self.authors = ko.observableArray();

    self.newBook = {
        Author: ko.observable(),
        Genre: ko.observable(),
        Price: ko.observable(),
        Title: ko.observable(),
        Year: ko.observable()
    };
    self.newAuthor = {
        AuthorName: ko.observable()
    };

    var booksUri = '/api/books/';
    var authorsUri = '/api/authors/';

    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }

    function getAllBooks() {
        ajaxHelper(booksUri, 'GET').done(function (data) {
            self.books(data);
        });
    }

    self.getBookDetail = function (item) {
        ajaxHelper(booksUri + item.Id, 'GET').done(function (data) {
            self.detail(data);
        });
    };

    function getAuthors() {
        ajaxHelper(authorsUri, 'GET').done(function (data) {
            self.authors(data);
        });
    }
    self.addBook = function (formElements) {
        var book = {
            AuthorID: self.newBook.Author().Id,
            Genre: self.newBook.Genre(),
            Price: self.newBook.Price(),
            Title: self.newBook.Title(),
            Year: self.newBook.Year()
        };

        ajaxHelper(booksUri, 'POST', book).done(function (item) {
            self.books.push(item);
        });
    };
    self.addAuthor = function (formElements) {
        var author = {
            AuthorName: self.newAuthor.AuthorName()
        };
        ajaxHelper(authorsUri, 'POST', author).done(function (item) {
            self.authors.push(item);
            //self.newAuthor = "";
            AuthorName: self.newAuthor.AuthorName("")
        });

    };


getAllBooks();
getAuthors();

   
};

ko.applyBindings(new ViewModel());