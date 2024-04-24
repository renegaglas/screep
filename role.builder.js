var utils = require('utils');

function init_construction(creep){
    console.log("init_construction : start");
    if (init_road(creep))
    {
        return true;
    }
    if (init_extention(creep))
    {
        return true;
    }
    console.log("init_construction : return false")
    return false;
}

// create one extention construction site on a road
function init_extention(creep) { // upgrade to : ask for more upgrader if not enought Controller level
    console.log("init_extention : start");
    var roads = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_ROAD)
        }
    });
    console.log("roads = " + roads);
    for (var i = 0; i < roads.length; i++)
    {
        var road = roads[i];
        console.log("road.pos = " + road.pos);
        var tmp = creep.room.createConstructionSite(road.pos.x, road.pos.y, STRUCTURE_EXTENSION)
        if (tmp == OK)
        {
            console.log("extention created at : " + road.pos);
            return true;
        }
        if (tmp == ERR_FULL || tmp == ERR_RCL_NOT_ENOUGH)
        {
            console.log("!can not create anything!");
            return false;
        }
    }
    console.log("!no where to create an extention!");
    return false;
}

function init_road(creep) { // upgrade to : create a graph to connect every thing
    console.log("init_road : start");
    var sources = creep.room.find(FIND_SOURCES);
    var structures = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER)
        }
    });

    for (var i = 0; i < sources.length; i++){
        console.log("sources[" + i + "].pos = " + sources[i].pos);
        var dest = sources[i].pos.findClosestByPath(structures, {ignoreCreeps : true});
        if (dest) // if path exist
        {
            var constructing = false;
            var path = creep.room.findPath(sources[i].pos, dest.pos, {ignoreCreeps : true}); // upgrade to : use pathfinder instead
            for (var n = 0; n < path.length - 1; n++)
            {
                if (Game.rooms.sim.createConstructionSite(path[n].x, path[n].y, STRUCTURE_ROAD) == OK)
                {
                    constructing = true;
                }
            }
            if (constructing)
            {
                return true;
            }
        }
    }
    return false;
}

var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.spawning)
        {
            return;
        }
	    if(creep.store[RESOURCE_ENERGY] == 0)
        {
            //console.log(creep + "switch 1 to " + utils.Job.Harvester);
	        utils.switch_job_to.run(creep, utils.Job.Harvester);
        }
        var target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES, {ignoreCreeps : true}); // upgrade to : don't check every tick
        if(target != null) {
            //creep.say('🚧 build');
            if(creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            if (!init_construction(creep))
            {
                //console.log(creep + "switch 2 to " + utils.Job.Carrier);
                utils.switch_job_to.run(creep, utils.Job.Carrier);
            }
        }
	}
};

module.exports = roleBuilder;
