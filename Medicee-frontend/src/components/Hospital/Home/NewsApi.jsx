import axios from "axios";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import "./NewsApi.css";
function NewsApi() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=6c620e5b6cf6489293630dc657488c2b"
        // "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=6c620e5b6cf6489293630dc657488c2b"
      )
      .then((response) => {
        console.log(response);
        setData(response.data.articles);
      });
  }, []);

  return (
    <div className="news-1">
      <div className="container">
        <div className="row">
          <h1 className="col-12 mt-5 news-2">Latest News</h1>
          <p className="col-12  mb-5 news-2">
            {" "}
            Latest news headlines from India around the world. Check out
            today's news coverage live with photos and content.
          </p>
          {data.slice(0, 3).map((value) => {
            return (
              <div className="col-lg-4 col-md-6 col-12 mt-5 mb-5">
                <Card>
                  <Card.Img
                    className="news-3"
                    variant="top"
                    src={value.urlToImage}
                  />
                  <Card.Body>
                    <Card.Title>{value.title}</Card.Title>
                    <Card.Text>{value.description}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NewsApi;
