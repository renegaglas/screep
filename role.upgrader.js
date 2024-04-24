var utils = require('utils');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.spawning)
        {
            return;
        }

	    if(creep.store[RESOURCE_ENERGY] > 0) {
            creep.say('⚡ upgrade');
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            utils.switch_job_to.run(creep, utils.Job.Harvester);
        }
	}
};

module.exports = roleUpgrader;
