import React, { useEffect, useState, useCallback } from "react";

const Exchange = ({ userId }) => {
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);

  const getIncomingInfo = useCallback(() => {
    fetch(`/api/getIncomingInfo/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Request failed");
        return response.json();
      })
      .then((data) => {
        setIncomingRequests(data);
      })
      .catch((err) => {
        console.error("Error in getIncomingInfo:", err);
      });
  }, [userId]);

  const getOutgoingInfo = useCallback(() => {
    fetch(`/api/getOutgoingInfo/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Request failed");
        return response.json();
      })
      .then((data) => {
        setOutgoingRequests(data);
      })
      .catch((err) => {
        console.error("Error in getOutgoingInfo:", err);
      });
  }, [userId]);

  useEffect(() => {
    getIncomingInfo();
    getOutgoingInfo();
  }, [getIncomingInfo, getOutgoingInfo]);

  const shipped = (book) => {
    fetch("/api/shipped", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ title: book.title, username: book.username }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to mark as shipped");
      })
      .then(() => {
        getIncomingInfo(); // Refresh list
      })
      .catch((err) => {
        console.error("Error in shipped:", err);
      });
  };

  return (
    <div className="exchange">
      <h3 className="incoming">Incoming Requests</h3>
      <div className="exchange-table-wrapper">
        <table className="exchange-table">
          <thead>
            <tr>
              <th>Book Requested</th>
              <th>User</th>
              <th>Email</th>
              <th>Mark As Shipped</th>
            </tr>
          </thead>
          <tbody>
            {incomingRequests?.map((req, i) => (
              <tr key={i}>
                <td>{req.title}</td>
                <td>{req.username}</td>
                <td>{req.email}</td>
                <td>
                  <button className="req-button" onClick={() => shipped(req)}>
                    Mark as Shipped
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="incoming">Outgoing Requests</h3>
      <div className="exchange-table-wrapper">
        <table className="exchange-table">
          <thead>
            <tr>
              <th>Book Requested</th>
              <th>User</th>
              <th>Email</th>
              <th>Shipping Status</th>
            </tr>
          </thead>
          <tbody>
            {outgoingRequests?.map((req, i) => (
              <tr key={i}>
                <td>{req.title}</td>
                <td>{req.username}</td>
                <td>{req.email}</td>
                <td><span className="status-badge">Pending...</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Exchange;
