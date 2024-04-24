var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleCarrier = require('role.carrier');
var tower = require('tower');
var utils = require('utils');
var memory_managment = require('memory_managment');


module.exports.loop = function () {
    //memory_managment.show_memory();

    utils.clear_dead_creap.run();

    for(var creep_name in Game.creeps) {
        var creep = Game.creeps[creep_name];
        if(creep.memory.role == utils.Job.Harvester) {
            roleHarvester.run(creep);
        }
        else if(creep.memory.role == utils.Job.Upgrader) {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == utils.Job.Builder) {
            roleBuilder.run(creep);
        }
        else if(creep.memory.role == utils.Job.Carrier) {
            roleCarrier.run(creep);
        }
    }

    utils.spawn_creeps.run();
    utils.check_spawning.run();
}
