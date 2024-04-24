function show_memory(){
    var tmp  = RawMemory.get(); //on the first access to Memory object
    // ...your script
    console.log(tmp);
}



//this part of the file has been abort
// do not use it

//objectif : use raw memory to stock every thing we need

//difficulty : don't have time to parse and arrange json object
/*
const element = {
    Sources: "sources"
  };

function show_memory(){
    var tmp  = RawMemory.get(); //on the first access to Memory object
    // ...your script
    console.log(tmp);

}

var memory_init = {
    run: function() {
        Memory.sources = JSON.parse("{}");
    }
}

var memory_set_val = {
    run: function(element, key, val = "{}") {
        switch (element) {
            case element.Sources:
                Memory.sources = JSON.parse("{" + "\"" + key + "\"" + ": " + val + "}"); // can't stock more than one source
                break;

            default:
                break;
        }
    }
}
var memory_get_val = {
    run: function(element, key) {
        switch (element) {
            case element.Sources:
                var tmp  = RawMemory.get();
                Memory.sources = JSON.parse("{" + "\"" + key + "\"" + ": " + val + "}");
                break;

            default:
                break;
        }
    }
}
*/
module.exports = {show_memory};
