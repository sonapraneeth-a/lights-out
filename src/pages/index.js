import React from "react"
import Link from "gatsby-link"
import Typography from "typography"
import Game from "../components/board/Game"

const typography = new Typography
({
    baseFontSize: "18px",
    baseLineHeight: 1.45,
    headerFontFamily: [
        "Avenir Next",
        "Helvetica Neue",
        "Segoe UI",
        "Helvetica",
        "Arial",
        "sans-serif",
    ],
    bodyFontFamily: ["Georgia", "serif"],
});


export default () =>
    <div style={{ margin: "1rem auto", maxWidth: "100%" }}>
        <Game/>
    </div>