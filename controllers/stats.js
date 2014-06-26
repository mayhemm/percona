var router = require("express").Router();
var Stat = require("../models/stat");

router.post("/", create);
router.get("/:id", readOne);
router.get("/", readAll);
router.put("/:id", update);
router.delete("/:id", destroy);

function create(request, response) {
    Stat.create(request.body).success(function() {
        response.send(201);
    }).error(function(error) {
        response.json(500, { error: error });
    });
}

function readOne(request, response) {
    Stat.find(request.params.id).success(function(stat) {
        response.json(stat);
    }).error(function(error) {
        response.json(500, { error: error });
    });
}

function readAll(request, response) {
    var options = {};
    var start = request.query.start;
    var end = request.query.end;
    
    if (start) {
        options.where = options.where || {};
        options.where.day = options.where.day || {};
        options.where.day.gte = new Date(start);
    }
    
    if (end) {
        options.where = options.where || {};
        options.where.day = options.where.day || {};
        options.where.day.lte = new Date(end);
    }
    
    Stat.findAll(options).success(function(rows) {
        response.json(rows);
    }).error(function(error) {
        response.json(500, { error: error });
    });
}

function update(request, response) {
    Stat.update(request.body, { id: request.params.id }).success(function() {
        response.send(201);
    }).error(function(error) {
        response.json(500, { error: error });
    });
}

function destroy(request, response) {
    Stat.destroy({ id: request.params.id }).success(function() {
        response.send(204);
    }).error(function(error) {
        response.json(500, { error: error });
    });
}

module.exports = router;
