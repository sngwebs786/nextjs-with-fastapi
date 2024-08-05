import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [postResponse, setPostResponse] = useState(null);

  const callAPI = async () => {
    try {
      console.log("call api called: ");
      const response = await fetch("http://127.0.0.1:8000/");
      const result = await response.json();
      const message = result.message;
      console.log(message);
      setData(message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const postApiCall = async () => {
    try {
      const postData = {
        name: name,
        price: price,
        quantity: quantity,
      };
      console.log("post api called: ");

      const response = await fetch("http://127.0.0.1:8000/create", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();
      const message = result.message;
      console.log(message);
      const item = result.item;
      setPostResponse(result);
      console.log(postResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>Next.js App with FastAPI Integration</h1>
      <button
        style={{ backgroundColor: "gray" }}
        onClick={() => {
          callAPI();
        }}
      >
        GET API
      </button>
      {data && (
        <div>
          <h2>Data from FastAPI:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      <br />
      <br />
      <br />
      <input
        style={{ color: "black", margin: "10px" }}
        value={name}
        type="text"
        name=""
        id=""
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        value={price}
        style={{ color: "black", margin: "10px" }}
        type="number"
        name=""
        id=""
        placeholder="price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      <input
        style={{ color: "black", margin: "10px" }}
        value={quantity}
        type="number"
        name=""
        id=""
        placeholder="quantity"
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button
        onClick={() => {
          postApiCall();
        }}
      >
        {" "}
        POST API
      </button>
      {postResponse ? (
        <>
          <p>{postResponse.message}</p>
          <p>Create Item Name: {postResponse.item.name || ""}</p>
          <p>Create Item Price: {postResponse.item.price || ""}</p>
          <p>Create Item Quantity: {postResponse.item.quantity || ""} </p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
