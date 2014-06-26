var controllers = angular.module("percona.controllers", []);

controllers.controller("HomeController", ["$scope", "$http", function($scope, $http) {
    $scope.startDate = "2013-11-19";
    $scope.endDate = "2014-06-22";

    $scope.showFetchError = false;
    $scope.showNoResults = false;
    
    $scope.stats = [];
    
    $scope.fetch = function() {
        var endpoint = "/stats";
        
        var config = { params: {} };
        config.params.start = $scope.startDate + " 00:00:00";
        config.params.end = $scope.endDate + " 00:00:00";
        
        $http.get(endpoint, config).then(function(response) {
            $scope.showFetchError = false;
            
            if (response.data.length > 0) {
                $scope.showNoResults = false;
                
                plot(response.data);
                $scope.stats = response.data;
            }
            else {
                $scope.showNoResults = true;
            }

        }, function(error) {
            $scope.showFetchError = true;
        });
    };

    function plot(data) {
        var margin = {top: 20, right: 80, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var parseDate = d3.time.format("%Y%m%d").parse;
        
        var x = d3.time.scale()
                .range([0, width]);
        
        var y = d3.scale.linear()
                .range([height, 0]);

        var color = d3.scale.category10();

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var line = d3.svg.line()
            .interpolate("basis")
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.stat); });

        d3.select("svg").remove();

        var svg = d3.select("#plot").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        color.domain(d3.keys(data[0]).filter(function(key) {
            return key == "s1" || key == "s2" || key == "s3" || key == "s4" || key == "s5"; 
        }));
        
        data.forEach(function(d) {
            d.day = parseDate(moment.utc(d.day).format("YYYYMMDD"));
        });
        
        var stats = color.domain().map(function(name) {
            return {
                name: name,
                values: data.map(function(d) {
                    return { date: d.day, stat: +d[name] };
                })
            };
        });

        x.domain(d3.extent(data, function(d) { return d.day; }));
        y.domain([
            d3.min(stats, function(c) { return d3.min(c.values, function(v) { return v.stat; }); }),
            d3.max(stats, function(c) { return d3.max(c.values, function(v) { return v.stat; }); })
        ]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Statistics");

        var stat = svg.selectAll(".stat")
            .data(stats)
            .enter().append("g")
            .attr("class", "stat");

        stat.append("path")
            .attr("class", "line")
            .attr("d", function(d) { return line(d.values); })
            .style("stroke", function(d) { return color(d.name); });
        
        stat.append("text")
            .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
            .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.stat) + ")"; })
            .attr("x", 3)
            .attr("dy", ".35em")
            .text(function(d) { return d.name; });
    }
}]);
