import axios from "axios";
import { useEffect, useRef } from "react";

const BookComponent = ({ book }) => {
  const buttonRef = useRef();
  const userId = localStorage.getItem("UserId");

  // Borrow book function
  const borrowBook = async (id, userId) => {
    try {
      const response = await axios.post(`http://localhost:5001/borrow/${id}`, { userId });
      alert(response.data.message);
      window.location.reload(); // Reload to update availability
    } catch (error) {
      console.error("Error borrowing book:", error);
      alert(error.response?.data?.error || "Failed to borrow the book.");
    }
  };

  // Add event listener for borrowing the book
  useEffect(() => {
    const handleClick = () => borrowBook(book.id, userId);

    if (buttonRef.current && book.isavailable) {
      buttonRef.current.addEventListener("click", handleClick);
    }

    // Cleanup the event listener on unmount
    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener("click", handleClick);
      }
    };
  }, [book.isavailable, book.id, userId]);

  return (
    <div>
      {book.isavailable && <button className="buttons" ref={buttonRef}>Borrow</button>}
    </div>
  );
};

export default BookComponent;
