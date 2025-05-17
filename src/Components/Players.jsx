import React, { useState } from "react";
import axios from "axios";

function PlayerSearch() {
  const [query, setQuery] = useState(""); // For input value
  const [suggestions, setSuggestions] = useState([]); // For player suggestions
  const [selectedPlayer, setSelectedPlayer] = useState(null); // For selected player details
  const [playerDetails, setPlayerDetails] = useState(null); // For player details

  const API_KEY = "0fdf97d786mshfe6215e209b9223p180cbejsn4f93c94ae981";
  const API_HOST = "cricbuzz-cricket.p.rapidapi.com";

  // Fetch player suggestions based on input
  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/search",
        {
          params: { plrN: input },
          headers: {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": API_HOST,
          },
        }
      );
      // Filter players that start with the input text
      const filteredPlayers = response.data.player.filter((player) =>
        player.name.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredPlayers || []);
    } catch (error) {
      console.error("Error fetching player suggestions:", error);
    }
  };

  // Fetch detailed player information
  const fetchPlayerDetails = async (playerId) => {
    try {
      const response = await axios.get(
        `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/${playerId}`,
        {
          headers: {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": API_HOST,
          },
        }
      );
      setPlayerDetails(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching player details:", error);
    }
  };

  // input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) fetchSuggestions(value);
    else setSuggestions([]);
  };

  // player selection
  const handlePlayerSelect = (player) => {
    setQuery(player.name); // Set input to the selected player name
    setSelectedPlayer(player.id);
    setQuery('');//clear input
    setSuggestions([]); // clear suggestions
    fetchPlayerDetails(player.id);
  };

  return (
    <div className="container pt-5 mt-5">
      <h1 className="text-center mb-4">Player Search</h1>
      <div className="d-flex justify-content-center flex-wrap">
        <div className="mb-3 col-12 col-md-8 col-lg-6 position-relative">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a player..."
            value={query}
            onChange={handleInputChange}
          />
          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul
              className="list-group position-absolute w-100 mt-1"
              style={{ zIndex: 1000 }}
            >
              {suggestions.map((player) => (
                <li
                  key={player.id}
                  className="list-group-item list-group-item-action"
                  onClick={() => handlePlayerSelect(player)}
                  style={{ cursor: "pointer" }}
                >
                  {player.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Player Details Section */}
      {playerDetails && (
        <div className="row gy-4 mt-4">
          <div className="col-md-6 col-lg-4">
            <h4>Personal Information</h4>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3 text-center bg-danger text-white fw-bold py-1 fs-4">{playerDetails.name}</h5>
                <p className="card-text text-secondary">
                  <strong className="text-dark me-2">Role :</strong> {playerDetails.role}
                </p>
                <p className="card-text text-secondary">
                  <strong className="text-dark me-2">Batting Style :</strong> {playerDetails.bat}
                </p>
                <p className="card-text text-secondary">
                  <strong className="text-dark me-2">Bowling Style :</strong> {playerDetails.bowl}
                </p>
                <p className="card-text text-secondary">
                  <strong className="text-dark me-2">Height :</strong>{" "}
                  {playerDetails?.height || "N/A"}
                </p>
                <p className="card-text text-secondary">
                  <strong className="text-dark me-2">Birthplace :</strong>{" "}
                  {playerDetails.birthPlace}
                </p>
                <p className="card-text text-secondary">
                  <strong className="text-dark me-2">Date Of Birth :</strong> {playerDetails.DoB}
                </p>
                <p className="card-text text-secondary">
                  <strong className="text-dark me-2">Teams :</strong> {playerDetails.teams}
                </p>
                <a target="_blank" className="btn text-white py-1" style={{backgroundColor:'#14a44d'}} href={playerDetails.appIndex?.webURL || "N/A"}>
                <p className="card-text ">
                  Read More
                </p>
                </a>
              </div>
            </div>
          </div>

          {/* Rankings */}
          <div className="col-md-6 col-lg-4">
            <h4>Rankings</h4>
            <ul className="list-group shadow-sm">
            <li className="list-group-item text-center">
                <span className="fw-bold fs-5">All </span>
                <ul className="list-group list-unstyled">
                  <li className="list-group-item"><strong className="me-3">ODI Best Rank :</strong>{" "}
                {playerDetails.rankings?.all?.odiBestRank || "N/A"}</li>
                  <li className="list-group-item"><strong className="me-3">ODI Rank :</strong>{" "}
                {playerDetails.rankings?.all?.odiRank || "N/A"}</li>
                <li className="list-group-item"><strong className="me-3">Test Best Rank :</strong>{" "}
                {playerDetails.rankings?.all?.testBestRank || "N/A"}</li>
                <li className="list-group-item"><strong className="me-3">Test Rank :</strong>{" "}
                {playerDetails.rankings?.all?.testRank || "N/A"}</li>
                </ul>
                
              </li>
              <li className="list-group-item text-center">
                <span className="fw-bold fs-5">Batting </span>
                <ul className="list-group list-unstyled">
                  <li className="list-group-item"><strong className="me-3">Test Rank :</strong>{playerDetails.rankings?.bat?.testRank || "N/A"}</li>
                  <li className="list-group-item"><strong className="me-3">T20 Rank :</strong>{playerDetails.rankings?.bat?.t20Rank || "N/A"}</li>
                  <li className="list-group-item"><strong className="me-3">ODI Rank :</strong>{playerDetails.rankings?.bat?.odiRank || "N/A"}</li>
                </ul>
              </li>
              
              <li className="list-group-item text-center">
                <span className="fw-bold fs-5">Bowling </span>
                <ul className="list-group list-unstyled">
                  <li className="list-group-item"><strong className="me-3">ODI Best Rank :</strong>{" "}
                {playerDetails.rankings?.bowl?.odiBestRank || "N/A"}</li>
                  <li className="list-group-item"><strong className="me-3">T20 Best Rank :</strong>{" "}
                {playerDetails.rankings?.bowl?.t20BestRank || "N/A"}</li>
                <li className="list-group-item"><strong className="me-3">Test Best Rank :</strong>{" "}
                {playerDetails.rankings?.bowl?.testBestRank || "N/A"}</li>
                </ul>
                
              </li>
              
            </ul>
          </div>

          {/* Bio Section */}
          <div className="col-md-12 col-lg-4">
            <h4>Bio</h4>
            <div
              className="shadow p-3"
              style={{ height: "500px", overflowY: "scroll", background: "#f8f9fa" }}
            >
              <p>{playerDetails.bio.replace(/<[^>]+>/g, "")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayerSearch;
