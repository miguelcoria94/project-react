import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";
import WelcomeMessage from "./WelcomeMessage"
import SearchBar from "./SearchBar"
import StockData from "./StockData"
import StockChart from "./StockChart"
import "./ProfilePage.style.css";
import { useDispatch } from "react-redux";
import * as profileActions from "../../store/profile";

function ProfilePage() {
  
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const searchBar = useSelector((state) => state.profile.symbol);
  const stockData = useSelector((state) => state.profile.stock);
  const graphData = useSelector((state) => state.profile.graph);

  if (sessionUser) {
    dispatch(profileActions.getWatchlist({sessionUser}))
  }

  if (sessionUser) {
    document.title = `JustStocks - ${sessionUser.username}`
  } else {
    document.title = 'JustStocks'
  }

    if (!sessionUser) return <Redirect to="/" />;

    return (
      <div className="profileContainer">
        <div className="profile_navdiv">
          <WelcomeMessage user={sessionUser} />
          <SearchBar search={searchBar} />
          <LogoutButton user={sessionUser} />
        </div>
        <div className="main-stock-div">
          <StockChart graphData={graphData} />
          <StockData stock={stockData} search={searchBar} user={sessionUser} />
        </div>
      </div>
    );

}

export default ProfilePage;

