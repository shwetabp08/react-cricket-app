import React, { useEffect, useState } from "react";
import axios from "axios";

const filterBtnArr = ["International", "Domestic", "Women", "League"]

const GetMatches = () => {
  const [matches, setMatches] = useState([]); // All fetched matches
  const [filteredMatches, setFilteredMatches] = useState([]); // Filtered matches on match-type
  const [activeFilter, setActiveFilter] = useState("International"); // Default filter

  // Fetch match data
  useEffect(() => {
    const fetchMatches = async () => {
      const options = {
        method: "GET",
        url: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent',
  headers: {
    'x-rapidapi-key': '0fdf97d786mshfe6215e209b9223p180cbejsn4f93c94ae981',
    'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
  },
      };

      try {
        const response = await axios.request(options);
        const typeMatches = response.data.typeMatches || [];
        setMatches(typeMatches);
        filterMatches(typeMatches, "International"); // Default filter
      } catch (error) {
        console.error("Error fetching match data:", error);
      }
    };

    fetchMatches();
  }, []);

  // Filter matches based on selected matchType
  const filterMatches = (allMatches, type) => {
    const filtered = allMatches
      .filter((matchGroup) => matchGroup.matchType === type) // Filter by matchType
      .flatMap((matchGroup) => matchGroup.seriesMatches) // Access seriesMatches
      .flatMap((series) => series.seriesAdWrapper?.matches || []); // Extract matches
    setFilteredMatches(filtered);
  };

  // Handle button click for filter
  const handleFilterClick = (type) => {
    setActiveFilter(type);
    filterMatches(matches, type);
  };

  // Helper to format date from timestamp
  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp, 10));
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>   
      <div className="container py-3">
      <h1 className="text-capitalize fw-bold pt-3 text-center">Recent matches</h1>

{/* Filter Buttons */}
<div className="d-flex flex-wrap gap-3 justify-content-center py-4">
  {
    filterBtnArr.map((e)=>{
      return(
        <button style={{backgroundColor: activeFilter === e ? "var(--secondary-color)" : "var(--primary-color)"}} className="btn rounded-5 fw-bold text-white" onClick={()=>handleFilterClick(e)}>
          {e}
        </button>
      )
    })
  }
</div>


{/* Match Cards */}
<div className="row gy-4 py-3">
{
  filteredMatches.length > 0 ? (
    filteredMatches.map((match, idx) => {
      const matchInfo = match.matchInfo;
      const matchScore = match.matchScore;

      const team1Score = matchScore?.team1Score?.inngs1 || {};
      const team2Score = matchScore?.team2Score?.inngs1 || {};

      return(
        <div className="col-lg-4 col-xl-4">
          <div className="border shadow p-3 position-relative">
          <div className="position-absolute top-0 end-0 m-2 ">
          <p className="small px-2 text-white rounded-5" style={{backgroundColor:'red'}}>{matchInfo?.matchFormat || "N/A"}</p>
          </div>
          <div className="position-absolute top-0 start-0 m-2 ms-3 col-8 col-md-9 col-lg-9 col-xxl-10">
          <p className="small fw-semibold text-secondary" style={{color:"var(--blue-color)"}}>
            {matchInfo?.seriesName || "Series Name Not Available"},
            <span className="text-dark ms-2">({matchInfo?.matchDesc || "N/A"})</span>
          </p>
          </div>
         <div className="mt-5 d-flex justify-content-center">
         <p className="text-center text-white bg-danger col-12">
            <strong>{matchInfo?.team1?.teamName || "Team 1"}</strong> vs{" "}
            <strong>{matchInfo?.team2?.teamName || "Team 2"}</strong>
          </p>
         </div>
                
          <div style={{ margin: "10px 0" }}>
              <p>
                <strong>{matchInfo?.team1?.teamName || "Team 1"}:</strong>{" "}
                {team1Score.runs !== undefined
                  ? `${team1Score.runs}/${team1Score.wickets} (${team1Score.overs} overs)`
                  : "Not Available"}
              </p>
              <p>
                <strong>{matchInfo?.team2?.teamName || "Team 2"}:</strong>{" "}
                {team2Score.runs !== undefined
                  ? `${team2Score.runs}/${team2Score.wickets} (${team2Score.overs} overs)`
                  : "Not Available"}
              </p>
            </div>
            <p style={{ color: "red" }}>
            {matchInfo?.status || "Status Not Available"}
          </p>
          <p className="text-muted small">
            {matchInfo?.startDate
              ? formatDate(matchInfo.startDate)
              : "Date Not Available"}
          </p> 
          </div>
        </div>
      )

    })
  ):(
    <p style={{ textAlign: "center", fontSize: "18px" }}>
      No matches found for "{activeFilter}".
    </p>
  )
}
</div>

      </div>
    </>
  );
};

export default GetMatches;
