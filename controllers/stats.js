var router = require('express').Router();

// create
router.post("/", function(request, response) {
    response.send(501);
});

// read
router.get("/:id?", function(request, response) {
    response.send(501);
});

// update
router.put("/:id", function(request, response) {
    response.send(501);
});

// delete
router.delete("/:id", function(request, response) {
    response.send(501);
});

module.exports = router;
