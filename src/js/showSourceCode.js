var bodyElem = d3.select('body'),
    jsElem = d3.select('#js'),
    jsPanel = bodyElem.append('div').attr('id', 'jsPanel');
cssElem = d3.select('#css'),
    cssPanel = bodyElem.append('div').attr('id', 'cssPanel');

function setupPanel(panel, elem, title) {
    panel.append('h2').text(title);
    return panel.append('pre').append('code').text(elem.html().trim());
}

function setupPanelFromSource(panel, elem, title) {
    var src = elem.attr('src')
    panel.append('h2').text(title + " (" + src + ")");
    var sourceNode = panel.append('pre').append('code');
    d3.text(src, function(error, response){
        sourceNode.text(response);
    })
    return sourceNode;
}

var jsCode = setupPanelFromSource(jsPanel, jsElem, 'JavaScript');
var cssCode = setupPanel(cssPanel, cssElem, 'CSS');

var hljsRoot = '../dist';

bodyElem.append('link')
    .attr('rel', 'stylesheet')
    .attr('href', hljsRoot + '/css/idea.css');
bodyElem.append('style')
    .attr('id', 'codeStyleCSS')
    .text('.hjls {background: #eeeeee;}');
bodyElem.append('script')
    .attr('src', hljsRoot + '/js/highlight.min.js')
    .on('load', function() {
        hljs.highlightBlock(jsCode.node());
        hljs.highlightBlock(cssCode.node());
    });
