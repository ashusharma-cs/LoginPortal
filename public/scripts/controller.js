// INITIALIZING ANGULAR
let myapp = angular.module("myapp", []);

// SETTING UP THE CONTROLLER FOR ANGULARJS TEMPLATE.
myapp.controller('LoginController', function ($scope, $http) {

    $scope.loginMessage = "";

    // DEFINING THE "login()" FUNCTION WHICH EXECUTES WHEN USER CLICKS ON THE LOGIN BUTTON.
    $scope.login = () => {

        // STORING THE USERNAME AND PASSWORD PROVIDED BY THE USER IN AN OBJECT
        let data = {
            name: $scope.username,
            pass: $scope.password
        };

        // MAKING THE VALUE OF USERNAME AND PASSWORD AS EMPTY STRINGS WHEN THE USER CLICKS ON THE LOGIN BUTTON.
        $scope.username = "";
        $scope.password = ""

        // SETTING UP A POST - HTTP REQUEST ON "/login" ROUTE THROUGH CLIENT SIDE TO THE SERVER SIDE. WHEN A RESPONSE IS SENT BY THE SERVER IT IS RESOLVED WITH A RESPONSE OBJECT.
        $http.post("/login", data)
            .then((response) => {

                // CONDITION TO CHECK IF THE SERVER RETURNED A NEW USER
                if (response.data.newUser) {

                    $scope.show = false;
                    $scope.loginMessage = "NEW USER CREATED.";
                    $scope.color = "blue";
                }
                // CONDTION TO CHECK IF THE SERVER RETURNED A RESPONSE WHEN PASSWORD DOESNT MATCHED.
                else if (response.data.flag) {

                    $scope.show = false;
                    $scope.loginMessage = response.data.message;
                    $scope.color = "red";
                }
                // ELSE BLOCK WHICH SHOWS ALL THE DETAILS OF THE USER.
                else {

                    if ('name' in response.data) {
                        $scope.show = true;
                        $scope.box1 = true;
                        $scope.box2 = true;
                        $scope.box3 = true;
                        $scope.loginMessage = "WELCOME BACK,  " + response.data.username;
                        $scope.color = "green";
                        $scope.name = response.data.name;
                        $scope.course = response.data.course;
                        $scope.country = response.data.country;
                    }
                    else {
                        $scope.show = true;
                        $scope.box1 = true;
                        $scope.box2 = false;
                        $scope.box3 = false;
                        $scope.loginMessage = "WELCOME BACK,  " + response.data.username;
                        $scope.color = "green";
                        $scope.name = response.data.username;
                    }


                }
            })
            .catch((err) => {
                $scope.loginMessage = "Error";
            })
    }
})