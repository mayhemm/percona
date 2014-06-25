var router = require('express').Router();

router.post("/", create);
router.get("/:id?", read);
router.put("/:id", update);
router.delete("/:id", destroy);

function create(request, response) {
    response.send(501);
}

function read(request, response) {
    response.send(501);
}

function update(request, response) {
    response.send(501);
}

function destroy(request, response) {
    response.send(501);
}

module.exports = router;
