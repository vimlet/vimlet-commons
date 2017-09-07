var vimlet_commons = require("../release");

//vimlet_commons.run.exec("dir", "/a");
vimlet_commons.run.exec("ping", ["8.8.8.8"], null, function(data, error, exit){

    if(data) {
        process.stdout.write("-> " + data);
    }

    if(error) {
        process.stdout.write("-> " + error);
    }

    if(exit) {
        process.stdout.write("-> exit with " + exit);
    }

});
