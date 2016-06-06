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
    var topicBackgroundsL = {
        "1": "#F9E0EC",
        "2": "#F9F0E0",
        "3": "#E4F8E2",
        "4": "#E0F9F5",
        "5": "#ede3f9"
    };
    var popup = new ChartPopup({
        containerId: "customContextMenu",
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

        var label = node.data.label;
        if (node.id.split('.').length > 1) {
            node.display = "text";
            node.fillColor = topicBackgrounds[node.id.split('.').shift()];
            node.labelStyle.textStyle.font = "12px Open Sans";
            //console.log(node);
            if (node.selected) {
                node.labelStyle.textStyle.font = "600 12px Open Sans";
                node.labelStyle.textStyle.fillColor = "#000";
                node.lineColor = topicBackgroundsL[node.id.split('.').shift()];
                node.lineWidth = 2;
            }
        }
        else {
            //console.log(node);
            node.radius = 40;
            node.fillColor = null;
            node.image = assetImgPath + "icons/icon_" + node.id + ".png";
            node.imageCropping = "crop";
            node.labelStyle.textStyle.font = "700 12px  Open Sans";
            node.lineColor = "#c3c5c7";
            node.lineWidth = 2;

            if (node == activeNode) {
                node.fillColor = "#f7f7f7";
            }

            if (node.selected) {
                node.fillColor = "#f7f7f7";
            }
        }


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

       if (node.hovered){
            node.radius = node.radius * 1.5;
        }
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
            expandOnClick: false,
            initialNodes: [netChartDefaultValue],
            focusNodeExpansionRadius: 2,
            numberOfFocusNodes: 1,
            focusNodeTailExpansionRadius: 0.2
        },
        advanced: {
            pointer: {noClickOnDoubleClick: false}
        },
        events: {
            onClick: netChartClick,
            onPositionChange: netChartPositionChanged,
            onHoverChange: netCharthoverEvent
        },
        nodeMenu: {enabled: false},
        linkMenu: {enabled: false},
        style: {
            fadeTime: 200,
            nodeRadiusExtent: [20, 30],
            node: {
                cursor: "pointer",
                display: "image"
            },
            nodeStyleFunction: function(node) {
                //nodeRadius(node);
                nodeStyle(node);
            },
            nodeSelected: {
                cursor: "move",
                fillColor: "#f7f7f7"
            },
            nodeFocused: {
                fillColor: "#f7f7f7"
            },
            nodeLabel: {
                borderRadius: 5,
                padding: 4
            }
        },
        interaction: {
            selection: {
                allowMoveNodesOffscreen: false,
                lockNodesOnMove: true
            },
            /*resizing: {enabled: false},*/
            zooming: {
               /* zoomExtent: [0.2, 3],*/
                autoZoomExtent: [0.6, 1.2]
                /*autoZoomSize: 0.9,
                initialAutoZoom: 'false'*/
            }
        },
        toolbar: {
            enabled: true,
                items:
                [
                    { item: "zoomcontrol", side: "left", align: "top" },
                    { item: "back", side: "top", align: "right" },
                    { item: "rearrange", side: "top", align: "right" },
                    { item: "fit", side: "top", align: "right" },
                    { item: "fullscreen", side: "top", align: "right" }
                ]
        }
    });
// var s = netChart.saveState();
// console.log(s);
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

    function netCharthoverEvent(event){

    }


    function netChartPositionChanged(event){
        if (event.selection.length > 0) {
            var node = event.selection[0];
            var n = {id: node.id};
            $.extend( n, netChart.getNodeDimensions(node) );
            popup.setOptions({ node: n});
            //console.log(node.shape.x);
            //console.log(node.shape.y);
            //netChart.lockNode(node.id, 0, 0);
            popup.place();
            netChart.updateSettings({layout: {mode: "dynamic"}});
        }
    };

    function netChartClick(event, args) {
        if (!event.ctrlKey && !event.shiftKey && args.clickNode) {
            netChart.addFocusNode(args.clickNode);
           // console.log($('#chartDiv').width());

            var w = -($('#chartDiv').width() / 2);
            var h = -($('#chartDiv').height() / 2);
            var x = 1000/*Math.floor(Math.random() * w)*/;
            var y = 60/*Math.floor(Math.random() * h)*/;
           // console.log(x);
           // console.log(y);
            //args.clickNode.shape.x = x;
            //args.clickNode.shape.y = y;
            //args.clickNode.shape.hWidth = 730;
           // args.clickNode.shape.hHeight= 300;
           // args.clickNode.coordinates = [x,y];

           // console.log(args.clickNode);
            //netChart.updateStyle([args.clickNode.id]);
           // console.log($('.DVSL-bar-btn-rearrange').width());
           //console.log(netChart.getNodeDimensions(args.clickNode));
           if (args.clickNode.id == "0") {
            popup.hide();
             netChart.updateSettings({layout: {nodeSpacing: 4}});
             //netChart.resetLayout();
            //$(".DVSL-bar-btn-rearrange").click();

             //netChart.home();
             //var back = netChart.back();
             //console.log(back);
             netChart.resetLayout();
             netChart.resetLayout();
           }
           else {
            netChart.resetLayout();
            //netChart.updateSettings({layout: {nodeSpacing: 40}});
           }

            //netChart.lockNode(args.clickNode, 0, 0);
        }

        popup.hide();
        if (args.clickNode) {
            var node = args.clickNode;
            var n = {id: node.id};
            $.extend( n, netChart.getNodeDimensions(args.clickNode) );
            /*node.pageX = event.pageX;
            node.pageY = event.pageY;
            popup.setNode(node);*/
            popup.setOptions({ node: n});
            popup.render();
           // menuElement.innerHTML = "Node menu";
        }
        else {
          popup.hide();
        }

        // disable the default context menu
        event.preventDefault();
        netChart.resetLayout();
    }

    function changeTargetNode(node) {
        var nodeId = node.id;
        netChart.updateStyle();
        netChart.resetLayout();
    }

    var updateHeight = function() {
        netChart.updateSettings({area: {height: Math.max(100, window.innerHeight)}});
        netChart.resetLayout();
    };
    window.onresize = function(event) {
        updateHeight();
    };
    window.addEventListener('orientationchange', updateHeight);
    updateHeight();

    $(popup.popup).on('shown.popup', function(event) {
        event.preventDefault();
        var node = netChart.selection()[0];
        var dimensions = netChart.getNodeDimensions(node);
        //netChart.lockNode(node.id, dimensions.x, dimensions.y);
        // node.fillColor = topicBackgroundsL[node.id.split('.').shift()];
        // node.lineColor = topicBackgrounds[node.id.split('.').shift()];
        // node.lineWidth = 1;
        netChart.updateSettings({layout: {mode: "static", nodeSpacing: 100}});
        console.log(netChart.selection());
    });

    $(popup.popup).on('hidden.popup', function(event) {
        event.preventDefault();
        //var nodes = netChart.nodes();
        //var dimensions = netChart.getNodeDimensions(node);
        //netChart.unLockNode(node.id);
        netChart.updateSettings({layout: {mode: "dynamic", nodeSpacing: 4}});
       //console.log(netChart.selection());
        netChart.resetLayout();
    });

};

var ChartPopup = function (options) {
    this.init(options);
};

ChartPopup.prototype = {
    containerId: null,
    popup: null,
    content: '',
    dataUrl: null,
    node: {
        id: 0,
        x: 0,
        y: 0,
        radius: 0,
        hwidth: 0
    },
    $accordion: $( '<div id="accordion"></div>' ),
    $close: $( '<a class="close">×</a>' ),
    siqDashboardPath: '#',

    init: function (options) {
        this.setOptions(options);
        this.popup = document.getElementById(this.containerId);
        // the context menu element has to be the direct descendant of the document.body
        document.body.appendChild(this.popup);
        this.dataUrl = options.dataUrl;
        // this.events();
       // this.setNode(options.node);
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
            _self.setContent(content);
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
        $(this.popup).trigger('shown.popup');
    },
    hide: function () {
        this.popup.style.display = "none";
        $(this.popup).trigger('hidden.popup');
    },
    style: function () {
        this.popup.className = 'popup' + this.node.id.split('.').shift();
    },
    place: function (x, y, radius, hwidth) {
        var x = this.node.x;
        var y = this.node.y;

        if (this.node.x > ($(window).width() / 2 + 100)) {
            // Show on the left
            x = this.node.x - (this.node.hwidth - 20) - $(this.popup).width();
        }
        else {
            // Show on the rigth
            x = this.node.x + this.node.hwidth - 20;
        }

        if (this.node.y > ($(window).height() / 2 + 50)) {
            // Top
           //console.log(this.node.radius * 2);
            y = this.node.y - $(this.popup).height() + (this.node.radius);
        }
        else {
            // Bottom
            y = this.node.y - (this.node.radius);
        }

        //x = this.node.x - (this.node.hwidth - 20) - $(this.popup).width();
        //console.log(y);
        // var x = this.node.x + (this.node.hwidth - 20);
       //var y = this.node.y + (this.node.radius / 4 - 2);
       // var x = this.node.x - (this.node.hwidth - 20) - $(this.popup).width();
        //var y = this.node.y  + (this.node.radius * 2) - $(this.popup).height();
        this.popup.style.left = x + "px";
        this.popup.style.top = y + "px";
        this.popup.style.zIndex = 1300;
    },
    setOptions: function (options) {
        $.extend( this, options );
        return this;
    },
    /*setNode: function (node) {
        this.node = node;
    },*/
    setContent: function (content) {
        var _self = this;

        this.$accordion.html(content);
        $(this.popup)
            .html(this.$accordion)
            .prepend(this.$close);

        this.$accordion.accordion({
          heightStyle: "content"
        });

        this.$accordion.on( "accordionactivate", function( event, ui ) {
            console.log(event);
            _self.place();
        } );

        this.$accordion.find('.figure').each(function(index, el) {
            console.log($(this));
            $(this).find('.zoom').on('click', function(event) {
                event.preventDefault();
                $(this).closest('.figure').toggleClass('figure-fixed');
            });
        });

        this.$close.on('click', function(event) {
            event.preventDefault();
            _self.hide();
        });
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
        output += '    <div class="figure">';
        output += '      <a href="#">';
        //onclick="$(this).closest(\'form\').submit(); return false; "
        output += '        <img src="' + imagePath + '" alt="' + alt + '" class="img-responsive" />';
        output += '        <span class="zoom"><i class="fa" aria-hidden="true"></i></span>';
        output += '       </a>';
        output += '     </div>';
        output += '   </form>';
        return output;
    },

    events: function () {
        var _self= this;
        this.$accordion.on( "accordionactivate", function( event, ui ) {
            console.log(event);
            _self.place();
        } );
    }
};
