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
    var assetDataURL = assetDataPath + "q.json";
	var assetImgPath = assetBasePath + "img/";
	var netChartDefaultValue =  '0';
    var topicBackgrounds = {
        "1": "#E2659F",
        "2": "#E2B465",
        "3": "#7ADD6E",
        "4": "#66E1CB",
        "5": "#A675E1"
    };
    var popup = new ChartPopup("customContextMenu", {
        dataUrl: assetDataURL
    });

    var activeNode = {};


     function chartDoubleClick(event) {
        popup.hide();
    }

    /*function showPopup(node) {
        menuElement.style.backgroundColor = topicBackgrounds[node.clickNode.id.split('.').shift()];
    }*/

    function nodeStyle(node) {
        console.log(node);
        //node.fillColor = null;
        //node.image = assetImgPath + "faces/" + node.id + ".png";
        var label = node.data.label;
        if (node.id.split('.').length > 1) {
            node.display = "text";
            //node.bounds.y0 = 0;
            node.fillColor = topicBackgrounds[node.id.split('.').shift()];
        }
        console.log(node.id.split('.').length);
        //node.items = [];
       /* if (node == activeNode) {*/
            /*node.label = "";
            node.items.push({
                text: label,
                px: 0, py: 1, x: 0, y: -20,
                textStyle: {fillColor: "black"}, backgroundStyle: {fillColor: "rgba(255,255,255,0.7)"}
            });*/
        /*} else {*/
            node.label = label;
            if (node.id !== "0") {
                node.labelStyle.backgroundStyle.fillColor = topicBackgrounds[node.id.split('.').shift()];
            }
       /* }*/
    }

    function selectionEvent(event){
        //if (!document.getElementById("selection").checked) return;
        var selection = event.selection;
       /*var contents = [];
        for (var i = 0; i < selection.length; i ++){
            var item = selection[i];
            var type = (item.isNode) ? "node": "link";
            contents.push(type + " " + item.id);
        }*/
    }

    /*function nodeMenu(data, node) {
      return "<h2>foo" + data.id + "</h2>";
    }*/
    var netChart = new NetChart({
        container: document.getElementById('chartDiv'),
        data: {
            url: assetDataURL
        },
        layout: {
            aspectRatio: true,
            nodeSpacing: 4
        },
        navigation: {
            mode: "focusnodes",
            initialNodes: [netChartDefaultValue],
            focusNodeExpansionRadius: 2,
            numberOfFocusNodes: 1,
            focusNodeTailExpansionRadius: 0.2
        },
        advanced: {
            pointer: {noClickOnDoubleClick: false}
        },
        events: {
            onClick: netChartClick
        },
        style: {
            fadeTime: 200,
            nodeRadiusExtent: [20, 30],
            nodeStyleFunction: function(node) {
                //nodeRadius(node);
                nodeStyle(node);
            }
        },
        interaction: {
            selection: {
                allowMoveNodesOffscreen: false,
                lockNodesOnMove: false
            },
            resizing: {enabled: false},
            zooming: {
                zoomExtent: [0.2, 3],
                autoZoomExtent: [0.8, 3],
                autoZoomSize: 0.9,
                wheel: false,
                initialAutoZoom: 'false'
            }
        }
    });
    /*var netChart = new NetChart({
        container: document.getElementById('chartDiv'),
        data: {
            url: assetDataURL
        },
        layout: {
            aspectRatio: true,
            nodeSpacing: 4
        },
        navigation: {
            mode: "focusnodes",
            initialNodes: [netChartDefaultValue],
            focusNodeExpansionRadius: 2,
            numberOfFocusNodes: 1,
            focusNodeTailExpansionRadius: 0.2
        },*/
        /*advanced: {
            pointer: {noClickOnDoubleClick: false}
        },*/
        /*events: {
            onClick: function (event) {
                if (event.clickNode) {
                    netChartClick(event);
                    changeTargetNode(event.clickNode);
                }
            },
            onDoubleClick: function (event) {
                chartDoubleClick(event);
            },
            onSelectionChange: selectionEvent
        },
        interaction: {
            /*selection: {
                allowMoveNodesOffscreen: false,
                lockNodesOnMove: false
            },*/
            /*resizing: {enabled: false},
            zooming: {
                zoomExtent: [0.2, 3],
                autoZoomExtent: [0.8, 3],
                autoZoomSize: 0.9,
                wheel: false,
                initialAutoZoom: 'false'
            }*/
        /*},
        nodeMenu: {enabled: false},
        linkMenu: {enabled: false},
        style: {
            fadeTime: 200,
            /*node: {
                imageCropping: false
            },
            nodeRadiusExtent: [20, 30],
            nodeAutoScaling: "none",
            nodeHovered: {fillColor: "white", shadowColor: "#B3B3B3", shadowOffsetY: 2},
            linkHovered: {fillColor: "#B3B3B3", shadowColor: "#B3B3B3"},*/
            /*nodeLabel: {
                padding: 1,
                borderRadius: 2,
                textStyle: {font: "10px Roboto", fillColor: "white"},
                backgroundStyle: {fillColor: "#B3B3B3"}
            },*/
            /*linkLabel: {
                padding: 1,
                borderRadius: 1,
                textStyle: {font: "4px Roboto", fillColor: "white"},
                backgroundStyle: {fillColor: "rgba(0,0,0,0.7)", lineColor: "transparent"}
            },*/
            /*nodeStyleFunction: function(node) {
                //nodeRadius(node);
                nodeStyle(node);
            },
            linkStyleFunction: function(link) {
                link.fillColor = "#B3B3B3";
                if (link.hovered) {
                    link.radius = 2;
                } else {
                    link.radius = 1;
                }
            },
            selection: {
                sizeConstant: 0,
                sizeProportional: 0
            }
        },
        toolbar: {
            enabled: true
        }
    });*/

    function netChartClick(event, args) {

        if (!event.ctrlKey && !event.shiftKey && args.clickNode) {
            netChart.addFocusNode(args.clickNode);
        }

        popup.hide();
        if (event.clickNode) {
            var node = event.clickNode;
            node.pageX = event.pageX;
            node.pageY = event.pageY;
            popup.setNode(node);
            popup.render();
           // menuElement.innerHTML = "Node menu";
        }
        else {
          popup.hide();
        }

        // disable the default context menu
        event.preventDefault();
    }

    function changeTargetNode(node) {
        var nodeId = node.id;
        netChart.updateStyle();
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

var ChartPopup = function (popupId, options) {
    this.init(popupId, options);
};

ChartPopup.prototype = {
    popup: null,
    content: '',
    dataUrl: null,
    node: null,
    $accordion: $( '<div id="accordion"></div>' ),
    siqDashboardPath: '#',

    init: function (popupId, options) {
        this.popup = document.getElementById(popupId);
        // the context menu element has to be the direct descendant of the document.body
        document.body.appendChild(this.popup);
        this.dataUrl = options.dataUrl;
        this.setNode(options.node);
    },
    render: function () {
        var _self = this;
        var request = $.ajax({
          url: this.dataUrl,
        });

        request.done(function( data ) {
          var el = data.nodes.filter(function (el) {
            if (!el.hasOwnProperty('id')) {
                return false;
            }
            if (el.id == _self.node.id && el.hasOwnProperty('children')) {
                return el;
            }

          })[0];

          var content = _self.themeAccordion(el);

         if (content.length > 0) {
            _self.$accordion.html(content);
            $(_self.popup).html(_self.$accordion)
            _self.$accordion.accordion({
              heightStyle: "content"
            });
            _self.place();
            _self.style();
            _self.show();
          }
          else {
            _self.hide();
          }
        });

        request.fail(function( jqXHR, textStatus ) {
          alert( "Request failed: " + textStatus );
        });
    },
    show: function () {
        this.popup.style.display = "block";
    },
    hide: function () {
        this.popup.style.display = "none";
    },
    style: function () {
        this.popup.className = 'popup' + this.node.id.split('.').shift();
    },
    place: function () {
        this.popup.style.left = this.node.pageX + "px";
        this.popup.style.top = this.node.pageY + "px";
        this.popup.style.zIndex = 1300;
    },
    setNode: function (node) {
        this.node = node;
    },
    themeAccordion: function (obj) {
        var output = "";
        if (typeof obj === 'object' && obj.hasOwnProperty('children')) {
            var itemsLength = obj.children.length;
            if (itemsLength > 0) {
                for (var i = 0; i < itemsLength; i++) {
                    var child = obj.children[i];
                    output += "<h3>" + child.label + "</h3>";
                    output += "<div>";
                    if (child.hasOwnProperty('boxes')) {
                        for (var n = child.boxes.length - 1; n >= 0; n--) {
                            output += this.themeLinkToDashboard(child.box_name, child.boxes[n], child.box_name, child.images[n]);
                        };
                    }
                    output += "<p>" + child.answer + "</p>";
                    output += "</div>";
                }
            }
        }
        return output;
    },
    themeLinkToDashboard: function (boxName, boxPath, alt, imageName) {
        var imagePath = 'https://clientportal.shopperintelligence.com/images/businessBuilder/' + imageName;
        var output = '<form method="post" action="' + this.siqDashboardPath + '" target="_blank">';
        output += '    <input type="hidden" name="format" value="' + boxPath.format + '" />';
        output += '    <input type="hidden" name="path" value="' + boxPath.path + '" />';
        output += '    <input type="hidden" name="box" value="' + boxName + '" />';
        output += '    <a href="#" onclick="$(this).closest(\'form\').submit(); return false; " >';
        output += '      <img class="figure" src="' + imagePath + '" alt="' + alt + '" />';
        output += '     </a>';
        output += '   </form>';
        return output;
    },
};
