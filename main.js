
const height = 700
const width = 900
const margin = {
    left : 50,
    right : 25,
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

var x = d3.scaleBand().range([0,width-margin.left-margin.right]).padding(0.2)
var y = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])

var color = d3.scaleOrdinal().range(d3.schemeDark2)


const axisGroup = svg.append("g").attr("id", "axisGroup")
const xGroup = axisGroup.append("g").attr("id", "xGroup")
    .attr("transform", `translate(${margin.left}, ${height- margin.bottom})`)
const yGroup = axisGroup.append("g").attr("id", "yGroup")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    

var axisX = d3.axisBottom().scale(x)
var axisY = d3.axisLeft().scale(y)


var tooltip =elementGroup.append("g")
    .attr("id", "tooltip")
var refLine = tooltip.append("line").attr("id", "refLine")
var info = d3.select("#chart")
    .append("div")
    .attr("id", "info")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "3px")
    .style("border-radius", "6px")
    .style("padding", "8px")
    .text("INFO")


d3.csv("data.csv").then(data =>{
    data.map(d =>{
        d.age = +d.age
        d.year = +d.year
    })
    x.domain(data.map(d=>d.year))
    y.domain([0, ageToday ])
    color.domain(data)

    xGroup.call(axisX)
    yGroup.call(axisY)

   
    elementGroup.selectAll("rect")
    .data(data)
    .join("rect")
        .attr("x", d => x(d.year))
        .attr("y", d => y(d.age))
        .attr("width", x.bandwidth())
        .attr("height", d => height - margin.top - margin.bottom - y(d.age))
        .attr("fill", d => color(d.name))
        
    .on("mouseover", function() {
        d3.select(this)
        .attr("fill-opacity", 1)
        return info.style("visibility", "visible")
    })
            
    .on("mousemove", function(d) {
        return info
        .style("top", (d3.event.pageY + 10) + 'px')
        .style("left", (d3.event.pageX + 10) + 'px')
        .text( d.name + " had " + (d.age) + " when she went out with DiCaprio, they took " + (age(d.year - 1) - d.age)+ " years") 
    })
            
    .on("mouseout", function() {
        d3.select(this)
        .attr("fill-opacity", 0.5)
    })
            
    .transition().delay(function(d, i) { return i * 100; })
    .duration(2000)
    .attr("fill", d => color(d.name))    
    
      

    refLine
        .attr("x1",x(d3.min(data.map(d=>d.year))))
        .attr("x2", x(d3.max(data.map(d=> d.year))))
        .attr("y1", y(age(d3.min(data.map(d=>d.year))) -1))
        .attr("y2", y(age(d3.max(data.map(d=>d.year)))-1))

    elementGroup.append("text")
        .text('The age between DiCaprio and his girlfrinds')
        .attr("x", margin.top +margin.left-40)
        .attr("y", (margin.top-13 + margin.right) * 2)
        .attr("font-size", 20)
        .attr("fill", 'lightsalmon')
    elementGroup.append("text")
        .text('Line-->DiCaprio age')
        .attr("x", margin.top +margin.left-10)
        .attr("y", (margin.right + margin.bottom-15) * 2)
        .attr("font-size", 20)
        .attr("fill", 'white')

    elementGroup.append("text")
        .text('Bars-->Girlfriends age')
        .attr("x", margin.top +margin.left-10)
        .attr("y", (margin.right + margin.bottom+5) * 2)
        .attr("font-size", 20)
        .attr("fill", 'white')
        
    
    elementGroup.selectAll("textTop")
        .data(data)
        .join("text")
            .text(d => age(d.year) - 1)
            .attr("x", d => x(d.year))
            .attr("y", d => y(age(d.year) - 1) - margin.bottom/2)
            .attr("font-size", 14)
            .attr("text-anchor", 'middle')
            .attr("fill", 'purple')
    
    elementGroup.selectAll("circle")
    .data(data)
    .join("circle")
        .attr("cx", d => x(d.year))
        .attr("cy", d => y(age(d.year) - 1))
        .attr("r", 8)
        .attr("fill", 'grey')
        .attr("fill-opacity", 0.8)
    
    .on("mouseover", function() {
        d3.select(this)
        .attr("r", 7)
        .attr("fill-opacity", 1)
        return info.style("visibility", "visible")
    })
        
    .on("mousemove", function(d) {
        return info
        .style("top", (d3.event.pageY + 10) + 'px')
        .style("left", (d3.event.pageX + 10) + 'px')
        .text( d.name + " had " + (d.age) + " when she went out with DiCaprio, they took " + (age(d.year - 1) - d.age)+ " years")
    })
        
    .on("mouseout", function() {
         d3.select(this)
        .attr("r", 5)
        .attr("fill-opacity", 0.5)
    })
        
    .transition().delay(function(d, i) { return i * 100; })
    .duration(2000)
    .attr("r", 5)
        
    elementGroup.selectAll("textBottom")
    .data(data)
    .join("text")
        .text(d => d.age)
        .attr("x", d => x(d.year)+12)
        .attr("y", d => y(d.age) - margin.bottom/2.5)
        .attr("font-size", 16)
        .attr("text-anchor", 'middle')
        .attr("fill", d => color(d.age))
        
        
    
        
            // console.log(data)
})