import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [news, setNews] = useState([]); 

  const fetchNews = async () => {
    const options = {
      method: "GET",
      url: "https://cricket-buzz-api.p.rapidapi.com/api/cricket/v1/news",
      headers: {
        "x-rapidapi-key": "0fdf97d786mshfe6215e209b9223p180cbejsn4f93c94ae981",
        "x-rapidapi-host": "cricket-buzz-api.p.rapidapi.com",
      },
    };

    try {
      const res = await axios.request(options);
      setNews(res.data.response.slice(0, 12));//only latest 12 news
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Latest Cricket News</h1>
      <div className="row">
        {news.length > 0 ? (
          news.map((item, index) => (
            <div key={index} className="col-md-6 col-lg-4 col-xl-3 mb-4">
              <div className="card shadow-sm h-100">
                
                <img
                  src={item.coverImages}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  
                  <h5 className="card-title" style={{fontSize:'17px'}}>{item.title}</h5>
                  
                  <p className="card-text fw-base text-secondary my-1" style={{fontSize:'15.6px',fontWeight:'400'}}>
                    {item.description.length > 100
                      ? item.description.slice(0, 100) + "..."
                      : item.description}
                  </p>
                  <small className="text-dark-50" style={{fontSize:'13.5px',fontWeight:'400'}}>-{item.pubDate}</small>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn fw-semibold text-white rounded-5 mx-2 mx-lg-5 mt-3"
                    style={{backgroundColor:'var(--primary-color)'}}
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <h5>Loading news...</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
