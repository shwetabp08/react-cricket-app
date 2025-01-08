import React, { useEffect, useState } from "react";
import axios from "axios";

const Series = () => {
  const [seriesData, setSeriesData] = useState([]); // State to store response data

    const fetchSeriesData = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://free-cricbuzz-cricket-api.p.rapidapi.com/cricket-series",
          headers: {
            "x-rapidapi-key": "0fdf97d786mshfe6215e209b9223p180cbejsn4f93c94ae981",
            "x-rapidapi-host": "free-cricbuzz-cricket-api.p.rapidapi.com",
          },
        };

        const res = await axios.request(options);
        console.log(res.data.response);
        setSeriesData(res.data.response); // Save response to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

  useEffect(() => {
    fetchSeriesData(); // Fetch data
  }, []);

  return (
    <>
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Series List</h1>
      <div className="row">
        {seriesData.length > 0 ? (
           seriesData.map((item, index) => (
            <div key={index} className="col-12 mb-4">
              <h4 className="mb-3 text-dark" style={{fontSize:'24px'}}>{item.date} :</h4>
              <div className="row">
                {item.seriesList.map((series) => (
                  <div className="col-md-6 mb-3" key={series.seriesId}>
                    <div className="card shadow-sm">
                      <div className="card-body">
                      <p className="card-text text-secondary fw-semibold">Dates: {series.seriesDate}</p>
                        <h6 className="card-title bg-danger py-1 text-white text-center" style={{fontSize:'18px'}}>{series.seriesName}</h6>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ):(
          <div className="my-3 text-center">
            <h3>Loading Series Data....</h3>
          </div>
        )
        }
      </div>
    </div>
    </>
  );
};

export default Series;
