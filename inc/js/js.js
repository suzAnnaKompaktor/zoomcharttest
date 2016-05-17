var ZoomChartsLicense = "ZCP-w4sm9lg0n: Production licence for *.zoomcharts.com";
var ZoomChartsLicenseKey = "577dc0aa9e80ab25c83df560952407bfb23369d8c5566347c7"+
"b54a64a4fbc45ccf4a1e7dbaf0827249c6676c19c918ed548f67ae225e813c5f57dfdc0709137"+
"7b72c6c3883f1ae343abf24153ef77d3470ee58a8d62781eac016e311d12122256184e9b3efed"+
"8b7e38d326e1fc10efc599576f803e7a173d128115eb57dabc5f4bf7ae520a50c6963e2ab8c56"+
"2fa24fa46d246e57afb5bb129fb4507e738251b644f0bd9235665138f043cbce5acfa8197f934"+
"c58e805963693344ff5240ad98d5aba8ed583f5990cd79e109ab23daaf8cba9ac5c3fee0471b2"+
"f8f5abff432bff536d8980d582411724f60e01244c8ae94e3e31a4afe4e3322dc9aa5567eabc9";


window.onload = function() {
    var assetBasePath = "inc/";
	var assetDataPath = assetBasePath + "data/";
	var assetImgPath = assetBasePath + "img/";
    var tabPrefix = "t-";
	var netChartDefaultValue = tabPrefix + '0';
    var topicBackgrounds = {
        "t-1": "#E2659F",
        "t-2": "#E2B465",
        "t-3": "#7ADD6E",
        "t-4": "#66E1CB",
        "t-5": "#A675E1"
    };

    function _(output) {
        console.log(output);
    }

    var activeNode = {};

    var menuElement = document.getElementById("custom_context_menu");

    // the context menu element has to be the direct descendant of the document.body
    document.body.appendChild(menuElement);

    function chartClick(event, args) {
        console.log(event);
        console.log(args);
        menuElement.style.display = "block";
        menuElement.style.left = event.pageX + "px";
        menuElement.style.top = event.pageY + "px";
        menuElement.style.zIndex = 1300;
        menuElement.style.backgroundColor = topicBackgrounds[event.clickNode.id];
        if (args.clickNode) {
           // menuElement.innerHTML = "Node menu";
        }
        else {
          hidePopup();
        }

        // disable the default context menu
        event.preventDefault();
    }

    function hidePopup() {
        menuElement.style.display = "none";
    }

    function nodeRadius(node) {
        activeNode = node.focused == true ? node : activeNode;
        if (node == activeNode) {
            node.radius = 30;
        } else { //default size
            node.radius = Math.max(node.relevance * 10, 20);
        }
        node.radius;
    }
    function nodeStyle(node) {
        console.log(node.labelStyle.backgroundStyle.fillColor);
        //node.fillColor = null;
        //node.image = assetImgPath + "faces/" + node.id + ".png";
        var label = node.data.title;
        node.items = [];
       /* if (node == activeNode) {*/
            /*node.label = "";
            node.items.push({
                text: label,
                px: 0, py: 1, x: 0, y: -20,
                textStyle: {fillColor: "black"}, backgroundStyle: {fillColor: "rgba(255,255,255,0.7)"}
            });*/
        /*} else {*/
            node.label = label;
            if (node.id !== "t-0") {
                node.labelStyle.backgroundStyle.fillColor = topicBackgrounds[node.id];
            }
       /* }*/
    }

    function linkStyle(link) {
        if (activeNode && ((link.from == activeNode || link.to === activeNode)) && activeNode.hovered == true) {
            link.fillColor = "green";
        }
    }

    function selectionEvent(event){
        if (!document.getElementById("selection").checked) return;
        var selection = event.selection;
        var contents = [];
        for (var i = 0; i < selection.length; i ++){
            var item = selection[i];
            var type = (item.isNode) ? "node": "link";
            contents.push(type + " " + item.id);
        }
    }



    /*function nodeMenu(data, node) {
      return "<h2>foo" + data.id + "</h2>";
    }*/

    var netChart = new NetChart({
        container: document.getElementById('chartDiv'),
        data: {
            url: assetDataPath + "graph.json"
        },
        layout: {
            aspectRatio: true,
            nodeSpacing: 4
        },
        navigation: {
            mode: "focusnodes",
            initialNodes: [netChartDefaultValue],
            focusNodeExpansionRadius: 2,
            numberOfFocusNodes: 2,
            focusNodeTailExpansionRadius: 0.5
        },
        /*advanced: {
            pointer: {noClickOnDoubleClick: false}
        },*/
        events: {
            onClick: function (event) {
                if (event.clickNode) {
                    chartClick(event);
                    changeTargetNode(event.clickNode);
                }
            },
            onSelectionChange: selectionEvent
        },
        interaction: {
            /*selection: {
                allowMoveNodesOffscreen: false,
                lockNodesOnMove: false
            },*/
            resizing: {enabled: false},
            zooming: {
                zoomExtent: [0.2, 3],
                autoZoomExtent: [0.8, 3],
                autoZoomSize: 0.9,
                wheel: false,
                initialAutoZoom: 'false'
            }
        },
        nodeMenu: {
            enabled: false/*,
            showData: false,
            buttons: "",
            contentsFunction: nodeMenu*/
        },
        linkMenu: {enabled: false},
        style: {
            fadeTime: 200,
            node: {
                imageCropping: true
            },
            nodeRadiusExtent: [20, 30],
            nodeAutoScaling: "none",
            nodeHovered: {fillColor: "white", shadowColor: "#419a00", shadowOffsetY: 2},
            linkHovered: {fillColor: "#419a00", shadowColor: "#419a00"},
            nodeLabel: {
                padding: 1,
                borderRadius: 2,
                textStyle: {font: "10px Roboto", fillColor: "white"},
                backgroundStyle: {fillColor: "black"}
            },
            linkLabel: {
                padding: 1,
                borderRadius: 1,
                textStyle: {font: "4px Roboto", fillColor: "white"},
                backgroundStyle: {fillColor: "rgba(0,0,0,0.7)", lineColor: "transparent"}
            },
            nodeStyleFunction: function(node) {
                nodeRadius(node);
                nodeStyle(node);
            },
            linkStyleFunction: function(link) {
                link.fillColor = "#09c";
                if (link.hovered) {
                    link.radius = 2;
                    link.label = link.data.type;
                } else {
                    link.radius = 1;
                }
                linkStyle(link);
            },
            selection: {
                sizeConstant: 0,
                sizeProportional: 0
            }
        },
        toolbar: {
            enabled: true
        }
    });

   function changeTargetNode(node) {
        var nodeId = node.id;
        if (nodeId != endNodeId) {
            endNodeId = nodeId;

            chart.updateStyle();
        }
    }

    var updateHeight = function() {
        netChart.updateSettings({area: {height: Math.max(100, window.innerHeight)}});
    };
    window.onresize = function(event) {
        updateHeight();
    };
    window.addEventListener('orientationchange', updateHeight);
    updateHeight();
};
