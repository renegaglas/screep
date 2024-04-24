var utils = require('utils');



function SetSource(creep) // search for the closest available source (by path)(max_range = 1000)
{
    var sources = creep.room.find(FIND_SOURCES);
    var threshold = 3; // upgrade to : threshold depend on available space around the source
    var path_len = 1000; // upgrade to : max_int or first path length
    for (var i = 0; i < sources.length; i++)
    {
        var source = sources[i];
        var other_creep = _.filter(Game.creeps, (creep) => creep.memory.source_id == source.id);
        var path_len_tmp = creep.room.findPath(creep.pos, source.pos).length; // upgrade to : take into acount the swamp
        if (other_creep.length < threshold && path_len_tmp < path_len) // available space
        {
            //console.log("source.id = " + source.id);
            //console.log("source.pos = " + source.pos);
            //console.log("path_len_tmp = " + path_len_tmp);
            creep.memory.source_id = source.id; // upgrade to : check if source has available space
            path_len = path_len_tmp;
        }
    }
    if (creep.memory.source_id != null)
    {
        return true;
    }
    return false;
}

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.spawning)
        {
            return;
        }

	    if(creep.store.getFreeCapacity() == 0) { // store full => change job to reference_job
            creep.memory.source_id = null; // free this creep source space
            utils.retrive_job.run(creep);
        }
        if (creep.memory.source_id == null) // => if source not assigned yet
        {
            SetSource(creep);
        }
        var source = Game.getObjectById(creep.memory.source_id);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
	}
};

module.exports = roleHarvester;
