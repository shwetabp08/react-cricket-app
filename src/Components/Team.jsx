import React, { useState } from "react";
import axios from "axios";

const CricketApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [players, setPlayers] = useState([]);

  const teamApiOptions = {
    method: "GET",
    url: "https://cricket-api-free-data.p.rapidapi.com/cricket-teams",
    headers: {
      "x-rapidapi-key": "0fdf97d786mshfe6215e209b9223p180cbejsn4f93c94ae981",
      "x-rapidapi-host": "cricket-api-free-data.p.rapidapi.com",
    },
  };

  const playerApiOptions = {
    method: "GET",
    url: "https://cricket-api-free-data.p.rapidapi.com/cricket-players",
    headers: {
      "x-rapidapi-key": "0fdf97d786mshfe6215e209b9223p180cbejsn4f93c94ae981",
      "x-rapidapi-host": "cricket-api-free-data.p.rapidapi.com",
    },
  };

  

  // Fetch teams based on the search term
  const fetchTeams = async () => {
    try {
      const response = await axios(teamApiOptions);
      const filteredTeams = response.data.response.filter((team) =>
      //team.title.toLowerCase().includes(searchTerm.toLowerCase())
       team.title.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setTeams(filteredTeams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  // Fetch players for the selected team
  const fetchPlayers = async (teamId) => {
    try {
      const response = await axios({
        ...playerApiOptions,
        params: { teamid: teamId },
      });
      setPlayers(response.data.response);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    fetchTeams();
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    setSearchTerm(team.title);
    setTeams([]); // Clear suggestions
    setSearchTerm(''); //clear input field
    fetchPlayers(team.id);
  };


  return (
    <div className="container">
      <h1 className="mt-5 pt-5 text-center">Cricket Teams and Players</h1>

      {/* Team Search */}
      <div className="d-flex justify-content-center">
      <div className="my-4 col-12 col-lg-8 col-xl-6">
        <label htmlFor="teamSearch" className="form-label fs-5 fw-semibold">
          Search Team :
        </label>
        <input
          type="text"
          className="form-control"
          id="teamSearch"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter team name..."
        />
        {teams.length > 0 && (
          <ul className="list-group mt-2">
            {teams.map((team) => (
              <li
                key={team.id}
                className="list-group-item list-group-item-action"
                onClick={() => handleTeamSelect(team)}
              >
                <img
                  src={team.image}
                  alt={team.title}
                  style={{ width: "30px", marginRight: "10px" }}
                />
                {team.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      </div>

      {/* Team Info */}
      {selectedTeam && (
        <div className="d-flex justify-content-center">
          <div className="card mb-4 col-12 col-lg-6 bg-light">
          <div className="card-body">
            <div className="d-flex gap-4 align-items-center justify-content-center">
              <h5 className="card-title fs-1 fw-bold">{selectedTeam.title}</h5>
              <img
                src={selectedTeam.image}
                alt={selectedTeam.title}
                style={{ width: "80px" }}
              />
            </div>
            {/* <button
              className="btn btn-primary"
              onClick={handleScheduleClick}
            >
              View Schedule
            </button> */}
          </div>
        </div>
        </div>
      )}

      {/* Players Info */}
      {players.length > 0 && (
        <div>
          <h2>Players</h2>
          <div className="row">
            {players.map((player) => (
              <div className="col-md-3 col-xl-2 mb-3" key={player.id}>
                <div className="card">
                  <img
                    src={player.image}
                    className="card-img-top"
                    alt={player.title}
                  />
                  <div className="card-body">
                    <h6 className="card-title" style={{fontSize:'17.5px'}}>{player.title}</h6>
                    <p className="card-text small"><span className="fw-semibold text-dark-50">Role:</span> {player.Role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default CricketApp;
