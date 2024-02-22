import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { BsFilter } from "react-icons/bs"; // Import filter icon
import "./pagination.css";
import moment from "moment";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [filters, setFilters] = useState({
    author: [],
    title: [],
    subject: [],
    publishedAt: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const booksPerPage = 10;
  const [sortBy, setSortBy] = useState(""); // State to handle sorting

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/getBooks");
        setBooks(res.data);
        // Extract unique values for each filter
        const authors = [
          "All Authors",
          ...new Set(res.data.map((book) => book.author)),
        ];
        const titles = [...new Set(res.data.map((book) => book.title))];
        const subjects = [...new Set(res.data.map((book) => book.subject))];
        const publishedDates = [
          ...new Set(res.data.map((book) => book.published_at)),
        ];
        setFilters({
          ...filters,
          author: authors,
          title: titles,
          subject: subjects,
          publishedAt: publishedDates,
        });
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const pageCount = Math.ceil(books.length / booksPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleFilterChange = (e) => {
    const { name, options } = e.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFilters({ ...filters, [name]: selectedOptions });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedBooks = () => {
    switch (sortBy) {
      case "author":
        return [...books].sort((a, b) => a.author.localeCompare(b.author));
      case "title":
        return [...books].sort((a, b) => a.title.localeCompare(b.title));
      case "subject":
        return [...books].sort((a, b) => a.subject.localeCompare(b.subject));
      case "publishedAt":
        return [...books].sort(
          (a, b) => new Date(a.published_at) - new Date(b.published_at)
        );
      default:
        return books;
    }
  };

  const displayBooks = sortedBooks()
    .filter((book) => {
      if (
        filters.author.length === 0 ||
        filters.author.includes("All Authors")
      ) {
        return true;
      } else {
        return filters.author.includes(book.author);
      }
    })
    .slice(pageNumber * booksPerPage, (pageNumber + 1) * booksPerPage)
    .map((book) => (
      <tr key={book.id}>
        <td className="border border-blue-500">{book.title}</td>
        <td className="border border-blue-500">{book.subject}</td>
        <td className="border border-blue-500">
          {moment(book.published_at).format("Do MMM, YYYY")}
        </td>
        <td className="border border-blue-500">{book.author}</td>
      </tr>
    ));

  return (
    <>
      <h1 className="bold text-4xl underline mb-6">
        Library Management System
      </h1>
      <div>
        <div></div>
        <button onClick={() => setShowFilters(!showFilters)}>
          <BsFilter /> Filter
        </button>
        {showFilters && (
          <div>
            <select
              name="author"
              onChange={handleFilterChange}
              className="mr-4"
            >
              <option value="">All Authors</option>
              {filters.author.map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>
            <select
              name="title"
              multiple
              onChange={handleFilterChange}
              className="mr-4"
            >
              <option value="">Select Titles</option>
              {filters.title.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
            <select
              name="subject"
              multiple
              onChange={handleFilterChange}
              className="mr-4"
            >
              <option value="">Select Subjects</option>
              {filters.subject.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <select
              name="publishedAt"
              multiple
              onChange={handleFilterChange}
              className="mr-4"
            >
              <option value="">Select Published Dates</option>
              {filters.publishedAt.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <select value={sortBy} onChange={handleSortChange} className="mr-4">
            <option value="">Sort by</option>
            <option value="author">Author</option>
            <option value="title">Title</option>
            <option value="subject">Subject</option>
            <option value="publishedAt">Published Date</option>
          </select>
        </div>
      </div>
      <table className="border border-blue-500">
        <thead className="border border-blue-500">
          <tr className="border border-blue-500">
            <th className="border border-blue-500"> Title</th>
            <th className="border border-blue-500">Subject</th>
            <th className="border border-blue-500">Published at</th>
            <th className="border border-blue-500">Author</th>
          </tr>
        </thead>
        <tbody>{displayBooks}</tbody>
      </table>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </>
  );
};

export default Home;
