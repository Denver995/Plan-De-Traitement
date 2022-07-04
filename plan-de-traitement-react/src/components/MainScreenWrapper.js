import React from "react";
import { typeScreen } from "../utils/constants";
import MainScreen from "./MainScreen";
import RendezVousScreen from "./appointmentComponents/RendezVousScreen"

export default function MainScreenWrapper({
  screenType = typeScreen.model,
}) {
  return (
    <div className="wrapper">
      {screenType === typeScreen.appointment ? <RendezVousScreen /> : <MainScreen />}
    </div>
  );
}
