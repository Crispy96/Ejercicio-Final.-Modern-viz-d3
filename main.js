
const height = 600
const width = 800
const margin = {
    left : 40,
    right : 10,
    top : 10,
    bottom : 40
}

const diCaprioBirthYear = 1974;
const age = function(year) { return year - diCaprioBirthYear}
const today = new Date().getFullYear()
const ageToday = age(today)

const svg = d3.select("#chart").append("svg").attr("width", width).attr("height", height)
const elementGroup = svg.append("g").attr("id", "elementGroup")

var x = d3.scaleBand().range([0, width - margin.left - margin.right])
var y = d3.scaleTime().range([height - margin.top - margin.bottom, 0])

const axisGroup = svg.append("g").attr("id", "axisGroup")
const xGroup = axisGroup.append("g").attr("id", "xGroup")
const yGroup = axisGroup.append("g").attr("id", "yGroup")

const axisX = d3.axisBottom().scale(x)
const axisY = d3.axisLeft().scale(y)

d3.csv("data.csv").then(data =>{
    console.log()
} )

