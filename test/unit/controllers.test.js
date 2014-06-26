describe("HomeController", function() {
    var scope, controller, httpBackend;

    beforeEach(module("percona.controllers"));

    beforeEach(inject(function($rootScope, $httpBackend, $controller) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        controller = $controller("HomeController", { $scope: scope });
    }));

    it("should exist", function() {
        expect(controller).toBeDefined();
    });
    
    it("should not show error messages on load", function() {
        expect(scope.showFetchError).toBe(false);
        expect(scope.showNoResults).toBe(false);
    });
    
    it("should display an error message on empty response", function() {
        httpBackend.whenGET("/stats?end=2014-06-22+00:00:00&start=2013-11-19+00:00:00").respond([]);
        scope.fetch();
        httpBackend.flush();
        
        expect(scope.showNoResults).toBe(true);
    });
    
    it("should display an error message when is unable to fetch records", function() {
        httpBackend.whenGET("/stats?end=2014-06-22+00:00:00&start=2013-11-19+00:00:00").respond(404);
        scope.fetch();
        httpBackend.flush();
        
        expect(scope.showFetchError).toBe(true);
    });
    
    it("We request 4 records, we should have 4 loaded", function() {
        var records = [
            {"id":1,"day":"2013-11-19T00:00:00.000Z","s1":11,"s2":48,"s3":35,"s4":0,"s5":0,"createdAt":"2014-06-26T18:59:54.000Z","updatedAt":"2014-06-26T18:59:54.000Z"},
            {"id":2,"day":"2013-11-20T00:00:00.000Z","s1":7,"s2":46,"s3":35,"s4":0,"s5":0,"createdAt":"2014-06-26T18:59:54.000Z","updatedAt":"2014-06-26T18:59:54.000Z"},
            {"id":3,"day":"2013-11-21T00:00:00.000Z","s1":9,"s2":47,"s3":36,"s4":0,"s5":0,"createdAt":"2014-06-26T18:59:54.000Z","updatedAt":"2014-06-26T18:59:54.000Z"},
            {"id":4,"day":"2013-11-22T00:00:00.000Z","s1":5,"s2":46,"s3":35,"s4":0,"s5":0,"createdAt":"2014-06-26T18:59:54.000Z","updatedAt":"2014-06-26T18:59:54.000Z"}
        ];
        
        httpBackend.whenGET("/stats?end=2014-06-22+00:00:00&start=2013-11-19+00:00:00").respond(records);
        scope.fetch();
        httpBackend.flush();
        
        expect(scope.stats.length).toBe(records.length);
    });
});
