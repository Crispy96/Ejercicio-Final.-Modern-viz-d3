
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

const svg = d3.select("#chart").append("svg").attr("id","svg").attr("width", width).attr("height", height)
const elementGroup = svg.append("g").attr("id", "elementGroup")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

var x = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(0.2)
var y = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])

const axisGroup = svg.append("g").attr("id", "axisGroup")
const xGroup = axisGroup.append("g").attr("id", "xGroup")
    .attr("transform", `translate(${margin.left}, ${height- margin.bottom})`)
const yGroup = axisGroup.append("g").attr("id", "yGroup")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)   

var axisX = d3.axisBottom().scale(x)
var axisY = d3.axisLeft().scale(y)

const formatDate = d3.timeParse("%Y")

d3.csv("data.csv").then(data =>{
    data.map(d =>{
        d.age = +d.age
        d.year = +d.year
    })
    x.domain(data.map(d=>d.year))
    y.domain([0, ageToday ])
    
    xGroup.call(axisX)
    yGroup.call(axisY)

    elementGroup.selectAll("rect").data(data).join("rect")
        .attr("x", d => x(d.year))
        .attr("y", d => y(d.age))
        .attr("height", d => height - margin.top - margin.bottom - y(d.age))
        .attr("width", x.bandwidth())
    
        console.log(data)


    } )