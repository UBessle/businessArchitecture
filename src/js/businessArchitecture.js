// Create a new directed graph
var g = new dagreD3.graphlib.Graph({compound:true}).setGraph({});

var teams = [
    { shortname: 'I', name: 'Inkasso', color:'#66CCFF' },
    { shortname: 'P', name: 'Personen', color:'#CCCC00' },
    { shortname: 'B', name: 'Buchen', color:'#FF6600' },
    { shortname: 'S', name: 'Schnittstellen', color:'orange' },
    { shortname: 'Q', name: 'Querschnitt', color:'lightcoral' },
    { shortname: '?', name: 'nicht zugeordnet', color:'lightsteelblue' }
]
/*
teams.forEach(function(teamNode) {
    var cluster = teamNode;
    cluster.label = teamNode.shortname;
    cluster.rx = cluster.ry = 3;
    cluster.style = "fill: #ffffff" /*+ team.color* /;
    g.setNode(teamNode.shortname, cluster);
})
*/
var businessComponents = [
    {  shortname: '?',  name: '?',  color: 'lightgray',  order: -1 },
    {  shortname: 'DEPR',  name: 'DEPRECATED',  color: 'lightgray',  order: -2 },
    {  shortname: 'ABST',  name: 'Ablaufsteuerung',  color: '#33BBFF',  row: 1,  col: 1,  colspan: 2,  teamguess: 'I',  order: 5.5 },
    {  shortname: 'ABRE',  name: 'Abrechnung',  color: '#CC5200',  row: 5,  col: 0,  colspan: 2,  teamguess: 'B',  order: 1 },
    {  shortname: 'ABSI',  name: 'Absicherung',  color: '#00AAFF',  row: 4,  col: 2,  teamguess: 'I',  order: 6 },
    {  shortname: 'ADER',  name: 'Adressermittlung',  color: '#FFFF00',  row: 9,  col: 2,  teamguess: 'P',  order: 14 },
    {  shortname: 'ADBE',  name: 'Außendienst-Beauftragung',  color: '#FFFF66',  row: 3,  col: 0,  teamguess: 'P',  order: 15 },
    {  shortname: 'AUSW',  name: 'Bereitstellen von Auswertung',  color: '#CCEEFF',  row: 0,  col: 2,  teamguess: 'I',  order: 8.5 },
    {  shortname: 'BUHA',  name: 'Buchhaltung',  color: '#FF6600',  row: 6,  col: 0,  teamguess: 'B',  order: 2 },
    {  shortname: 'FOMA',  name: 'Forderungs-Management',  color: '#66CCFF',  row: 6,  col: 1,  teamguess: 'I',  order: 7 },
    {  shortname: 'FORD',  name: 'Forderung',  color: '#66CCFF',  row: 6,  col: 1,  teamguess: 'I',  order: 7 },
    {  shortname: 'IMMO',  name: 'Immo',  color: '#99DDFF',  row: 6,  col: 2,  teamguess: 'I',  order: 8 },
    {  shortname: 'INSO',  name: 'Insolvenz',  color: '#0088CC',  row: 5,  col: 2,  teamguess: 'I',  order: 5 },
    {  shortname: 'KOIN',  name: 'Kommunikation Inbound',  color: '#FFFFE5',  row: 2,  col: 0,  teamguess: 'P',  order: 17 },
    {  shortname: 'KOWI',  name: 'Kommunikation mit Wirtschaftsauskunfteien',  color: '#CCEEFF',  row: 3,  col: 1,  colspan: 2,  teamguess: 'I',  order: 9 },
    {  shortname: 'KOOU',  name: 'Kommunikation Outbound',  color: '#FFFFCC',  row: 2,  col: 1,  teamguess: 'P',  order: 16 },
    {  shortname: 'KE',    name: 'Kontoeröffnung',  color: '#FFA500',  row: 1,  col: 0,  teamguess: 'S',  order: 18 },
    {  shortname: 'MAAU',  name: 'Mandanten-/Auftragsmanagement',  color: '#4D4D00',  row: 7,  col: 1,  colspan: 2,  teamguess: 'P',  order: 10 },
    {  shortname: 'MAZU',  name: 'Mandantenzugriff (Web@ccount)',  color: '#FFC966',  row: 0,  col: 1,  teamguess: 'S',  order: 20 },
    {  shortname: 'ORGA',  name: 'Organisations- und Mitarbeiterverwaltung',  color: '#999900',  row: 7,  col: 0,  teamguess: 'P',  order: 12 },
    {  shortname: 'PERS',  name: 'Personenverwaltung(inkl. Anreicherung)',  color: '#CCCC00',  row: 8,  col: 1,  colspan: 2,  teamguess: 'P',  order: 13 },
    {  shortname: 'RUEC',  name: 'Rückmeldung an Mandanten',  color: '#FFB833',  row: 2,  col: 2,  teamguess: 'S',  order: 19 },
    {  shortname: 'SCHU',  name: 'Schuldnerzugriff (Schuldnerportal)',  color: '#E6E600',  row: 0,  col: 0,  teamguess: 'P',  order: 13.5 },
    {  shortname: 'SCOR',  name: 'Scoring',  color: '#666600',  row: 9,  col: 0,  colspan: 2,  teamguess: 'P',  order: 11 },
    {  shortname: 'TARF',  name: 'Tarifierung',  color: '#993D00',  row: 4,  col: 1,  teamguess: 'B',  order: 0 },
    {  shortname: 'TI',    name: 'Technische Infrastruktur',  color: '#F08080',  row: 10,  col: 0,  colspan: 3,  teamguess: 'Q',  order: 21 },
    {  shortname: 'ZAVB',  name: 'Zahlungsvereinbarung',  color: '#FFE0CC',  row: 8,  col: 0,  teamguess: 'B',  order: 4 },
    {  shortname: 'ZAVK',  name: 'Zahlungsverkehr',  color: '#FFA366',  row: 4,  col: 0,  teamguess: 'B',  order: 3 }
].sort(function(a, b) {  return a.order - b.order; });

// Add components to the graph, set labels, and style
businessComponents.forEach(function(component) {
    var node = component;
    node.label = component.shortname;
    node.rx = node.ry = 5;
    node.style = "fill: " + component.color;
    g.setNode(component.shortname, node);
    //g.setParent(component.shortname, component.teamguess);
});

// Set up the edges
g.setEdge("MAZU", "ORGA", { label: "use" });
g.setEdge("MAZU", "KE",   { label: "use" });
g.setEdge("MAZU", "FOMA", { label: "use" });

g.setEdge("ORGA", "ABST", { label: "provides" });

g.setEdge("KE",   "MAAU", { label: "use" });
g.setEdge("KE",   "RUEC", { label: "use" });
g.setEdge("KE",   "FOMA", { label: "use" });
g.setEdge("KE",   "IMMO", { label: "use" });
g.setEdge("KE",   "PERS", { label: "use" });
g.setEdge("KE",   "ABSI", { label: "use" });
g.setEdge("KE",   "INSO", { label: "use" });

g.setEdge("IMMO", "FOMA", { label: "extends" });

g.setEdge("ABST", "MAAU", { label: "use" });

g.setEdge("FOMA", "ABSI", { label: "use" });
g.setEdge("FOMA", "ABST", { label: "provides" });
g.setEdge("FOMA", "BUHA", { label: "use" });
g.setEdge("FOMA", "FORD", { label: "use" });
g.setEdge("FOMA", "INSO", { label: "use" });
g.setEdge("FOMA", "MAAU", { label: "use" });
g.setEdge("FOMA", "ORGA", { label: "use" });
g.setEdge("FOMA", "ZAVB", { label: "use" });
g.setEdge("FOMA", "ZAVK", { label: "use" });

g.setEdge("PERS", "FOMA", { label: "use", style:"stroke:#f66; stroke-width:2px; fill:none;", arrowheadStyle: "fill: #f66"});
g.setEdge("PERS", "MAAU", { label: "use", style:"stroke:#f66; stroke-width:2px; fill:none;", arrowheadStyle: "fill: #f66"});
g.setEdge("PERS", "ADER", { label: "use" });

g.setEdge("SCHU", "ORGA", { label: "use" });

g.setEdge("ZAVB", "ABST", { label: "provides" });
g.setEdge("ZAVB", "MAAU", { label: "use" });

g.setEdge("ZAVK", "ABST", { label: "provides" });
g.setEdge("ZAVK", "BUHA", { label: "ausgehend" });

g.setEdge("BUHA", "ZAVK", { label: "eingehend" });
g.setEdge("BUHA", "MAAU", { label: "use" });
g.setEdge("BUHA", "ABST", { label: "provides" });

g.setEdge("RUEC", "FORD", { label: "use" });

g.setEdge("KOWI", "FORD", { label: "use" });
g.setEdge("KOWI", "PERS", { label: "use" });
g.setEdge("KOWI", "ABST", { label: "provides" });

g.setEdge("ABRE", "MAAU", { label: "use" });
g.setEdge("ABRE", "TARF", { label: "use" });

g.setEdge("TARF", "ABST", { label: "provides" });
g.setEdge("TARF", "MAAU", { label: "use" });
g.setEdge("TARF", "BUHA", { label: "use" });

g.setEdge("KOIN", "ABST", { label: "provides" });
g.setEdge("KOIN", "FORD", { label: "use" });

g.setEdge("KOOU", "ABST", { label: "provides" });
g.setEdge("KOOU", "FORD", { label: "use" });

g.setEdge("ADBE", "ABST", { label: "provides" });
g.setEdge("ADBE", "ORGA", { label: "use" });
g.setEdge("ADBE", "SCOR", { label: "use" });
g.setEdge("ADBE", "FORD", { label: "use" });

g.setEdge("SCOR", "MAAU", { label: "use" });

g.setEdge("ABSI", "MAAU", { label: "use" });
g.setEdge("ABSI", "ABST", { label: "provides" });
g.setEdge("ABSI", "FORD", { label: "use" });

g.setEdge("INSO", "FORD", { label: "use" });
g.setEdge("INSO", "ABST", { label: "use" });


// Create the renderer
var render = new dagreD3.render();

// Set up an SVG group so that we can translate the final graph.
var svg = d3.select("svg"),
    inner = svg.append("g");

// Set up zoom support
var zoom = d3.behavior.zoom().on("zoom", function() {
    inner.attr("transform", "translate(" + d3.event.translate + ")" +
    "scale(" + d3.event.scale + ")");
});
svg.call(zoom);

// Simple function to style the tooltip for the given node.
var styleTooltip = function(name, description) {
    return "<p class='name'>" + name + "</p><p class='description'>" + description + "</p>";
};

// Run the renderer. This is what draws the final graph.
render(inner, g);

inner.selectAll("g.node")
    .attr("title", function(v) { return styleTooltip(v, g.node(v).name) })
    .each(function(v) { $(this).tipsy({ gravity: "w", opacity: 1, html: true }); });

inner.selectAll("g.cluster")
    .attr("title", function(v) { return styleTooltip(v, g.cluster(v).name) })
    .each(function(v) { $(this).tipsy({ gravity: "w", opacity: 1, html: true }); });

// Center the graph
var horizontalScale = (svg.attr("width")-40) / g.graph().width
var verticalScale = svg.attr("height") / g.graph().height
var initialScale = Math.min(horizontalScale, verticalScale);
zoom
    .translate([(svg.attr("width") - g.graph().width * initialScale) / 2, 20])
    .scale(initialScale)
    .event(svg);
svg.attr('height', g.graph().height * initialScale + 40);
