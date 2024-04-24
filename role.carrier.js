/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.carrier');
 * mod.thing == 'a thing'; // true
 */

var utils = require('utils');

var roleCarrier = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.spawning)
        {
            return;
        }
        if (creep.store[RESOURCE_ENERGY] == 0)
        {
            utils.switch_job_to.run(creep, utils.Job.Harvester);
        }
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if(targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else { // not available target => change job to harvester
            utils.switch_job_to.run(creep, utils.Job.Builder);
        }
    }
};

module.exports = roleCarrier;
